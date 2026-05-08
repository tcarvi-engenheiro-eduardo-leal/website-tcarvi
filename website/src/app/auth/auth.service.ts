import { Injectable, Injector, NgZone, PLATFORM_ID, inject, runInInjectionContext, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import {
  Auth,
  GoogleAuthProvider,
  OAuthProvider,
  User,
  browserSessionPersistence,
  getRedirectResult,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { googleOAuthClientId } from '../../environments/firebase.config';

export interface OAuthUser {
  uid: string;
  provider: string;
  name?: string;
  email?: string;
  picture?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(Auth, { optional: true });
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly injector = inject(Injector);
  private readonly ngZone = inject(NgZone);

  readonly user = signal<OAuthUser | null>(null);

  constructor() {
    if (!isPlatformBrowser(this.platformId) || !this.auth) return;
    setPersistence(this.auth, browserSessionPersistence).then(() => {
      onAuthStateChanged(this.auth!, (firebaseUser) => {
        this.ngZone.run(() => {
          this.user.set(firebaseUser ? this.mapUser(firebaseUser) : null);
        });
      });
    });
  }

  async initialize(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.auth) return;
    try {
      // Consome qualquer estado de redirect pendente no localStorage
      // (gerado por tentativas anteriores com signInWithRedirect).
      // Sem isso, o auth handler abre o popup e conclui o fluxo anterior imediatamente.
      await getRedirectResult(this.auth);
    } catch { /* estado inválido ou expirado — ignorar */ }
  }

  async signInWithGoogle(): Promise<void> {
    if (!this.auth) { console.error('[AuthService] Firebase não configurado.'); return; }
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ client_id: googleOAuthClientId });
      await runInInjectionContext(this.injector, () => signInWithPopup(this.auth!, provider));
      this.router.navigate(['/chat']);
    } catch (err) {
      console.error('[AuthService] Google sign-in error:', err);
    }
  }

  async signInWithMicrosoft(): Promise<void> {
    if (!this.auth) { console.error('[AuthService] Firebase não configurado.'); return; }
    try {
      await runInInjectionContext(this.injector, () => signInWithPopup(this.auth!, new OAuthProvider('microsoft.com')));
      this.router.navigate(['/chat']);
    } catch (err) {
      console.error('[AuthService] Microsoft sign-in error:', err);
    }
  }

  async signInWithApple(): Promise<void> {
    if (!this.auth) { console.error('[AuthService] Firebase não configurado.'); return; }
    try {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');
      await runInInjectionContext(this.injector, () => signInWithPopup(this.auth!, provider));
      this.router.navigate(['/chat']);
    } catch (err) {
      console.error('[AuthService] Apple sign-in error:', err);
    }
  }

  async signOut(): Promise<void> {
    if (this.auth) await runInInjectionContext(this.injector, () => signOut(this.auth!));
    this.user.set(null);
    this.router.navigate(['/l1']);
  }

  private mapUser(u: User): OAuthUser {
    return {
      uid: u.uid,
      provider: u.providerData[0]?.providerId ?? 'unknown',
      name: u.displayName ?? undefined,
      email: u.email ?? undefined,
      picture: u.photoURL ?? undefined,
    };
  }
}
