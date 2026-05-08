import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { map, of, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const toL1 = of(router.createUrlTree(['/l1']));

  if (!isPlatformBrowser(inject(PLATFORM_ID))) return toL1;

  const auth = inject(Auth, { optional: true });
  if (!auth) return toL1;

  return authState(auth).pipe(
    take(1),
    map((user) => (user ? true : router.createUrlTree(['/l1']))),
  );
};
