/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ApplicationConfig, inject, PLATFORM_ID, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideMarkdown } from 'ngx-markdown';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  browserLocalPersistence,
  browserPopupRedirectResolver,
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
  provideAuth,
} from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { firebaseConfig } from '../environments/firebase.config';
import { routes } from './app.routes';
import { AuthService } from './auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideMarkdown(),
    ...(firebaseConfig.apiKey
      ? [
          provideFirebaseApp(() => initializeApp(firebaseConfig)),
          provideAuth(() => {
            if (!isPlatformBrowser(inject(PLATFORM_ID))) {
              return getAuth(getApp());
            }
            // initializeAuth precisa rodar em Zone.root para que os callbacks
            // assíncronos do IndexedDB usem Promises nativas (não ZoneAwarePromise).
            // Com ZoneAwarePromise, Zone.js 0.15.x muda o timing do generator async
            // do AuthImpl e uma referência de classe ainda não resolvida (circular
            // dep de módulo) chega undefined em _getInstance → TypeError.
            const rootZone = (globalThis as { Zone?: { root?: { run?: <T>(fn: () => T) => T } } }).Zone?.root;
            const init = () => initializeAuth(getApp(), {
              persistence: [indexedDBLocalPersistence, browserLocalPersistence],
              popupRedirectResolver: browserPopupRedirectResolver,
            });
            return rootZone?.run ? rootZone.run(init) : init();
          }),
          provideAnalytics(() => getAnalytics()),
          ScreenTrackingService,
        ]
      : []),
    provideAppInitializer(() => inject(AuthService).initialize()),
  ],
};
