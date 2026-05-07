import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { authCredentials } from '../../environments/auth-credentials';
import type { PublicClientApplication, AuthenticationResult } from '@azure/msal-browser';

export interface OAuthUser {
  provider: 'google' | 'microsoft' | 'apple';
  name?: string;
  email?: string;
  picture?: string;
  accessToken?: string;
  idToken?: string;
}

interface GoogleUserInfo {
  name: string;
  email: string;
  picture: string;
}

interface AppleJwtPayload {
  sub: string;
  email?: string;
}

interface GoogleAccounts {
  oauth2: {
    initTokenClient(config: {
      client_id: string;
      scope: string;
      callback: (r: { access_token?: string; error?: string }) => void;
    }): { requestAccessToken(): void };
  };
}

interface AppleAuthResponse {
  authorization: { code: string; id_token: string; state: string };
  user?: { name?: { firstName?: string; lastName?: string }; email?: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private msalInstance: PublicClientApplication | null = null;

  readonly user = signal<OAuthUser | null>(null);

  async initialize(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.msalInstance || !authCredentials.microsoft.clientId) return;

    const { PublicClientApplication } = await import('@azure/msal-browser');
    this.msalInstance = new PublicClientApplication({
      auth: {
        clientId: authCredentials.microsoft.clientId,
        authority: `https://login.microsoftonline.com/${authCredentials.microsoft.tenantId}/v2.0`,
        redirectUri: window.location.origin,
      },
      cache: { cacheLocation: 'sessionStorage' },
    });
    await this.msalInstance.initialize();
    await this.msalInstance.handleRedirectPromise();
  }

  signInWithGoogle(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const google = (window as unknown as { google?: { accounts?: GoogleAccounts } }).google;
    if (!google?.accounts?.oauth2) {
      console.error('[AuthService] Google Identity Services não carregado.');
      return;
    }

    google.accounts.oauth2
      .initTokenClient({
        client_id: authCredentials.google.clientId,
        scope: 'openid email profile',
        callback: (response) => {
          if (response.error || !response.access_token) {
            console.error('[AuthService] Google sign-in error:', response.error);
            return;
          }
          const token = response.access_token;
          this.http
            .get<GoogleUserInfo>('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${token}` },
            })
            .subscribe({
              next: (info) =>
                this.onAuthSuccess({
                  provider: 'google',
                  name: info.name,
                  email: info.email,
                  picture: info.picture,
                  accessToken: token,
                }),
              error: (err) => console.error('[AuthService] Erro ao buscar perfil Google:', err),
            });
        },
      })
      .requestAccessToken();
  }

  async signInWithMicrosoft(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.msalInstance) await this.initialize();
    if (!this.msalInstance) {
      console.error('[AuthService] MSAL não inicializado.');
      return;
    }
    try {
      const result: AuthenticationResult = await this.msalInstance.loginPopup({
        scopes: ['openid', 'email', 'profile'],
      });
      this.onAuthSuccess({
        provider: 'microsoft',
        name: result.account?.name ?? undefined,
        email: result.account?.username,
        accessToken: result.accessToken,
        idToken: result.idToken,
      });
    } catch (err) {
      console.error('[AuthService] Microsoft sign-in error:', err);
    }
  }

  async signInWithApple(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const AppleID = (
      window as unknown as {
        AppleID?: {
          auth?: {
            init(config: object): void;
            signIn(): Promise<AppleAuthResponse>;
          };
        };
      }
    ).AppleID;

    if (!AppleID?.auth) {
      console.error('[AuthService] Apple Sign In JS não carregado.');
      return;
    }

    AppleID.auth.init({
      clientId: authCredentials.apple.serviceId,
      scope: 'name email',
      redirectURI: authCredentials.apple.redirectURI,
      state: crypto.randomUUID(),
      usePopup: true,
    });

    try {
      const response = await AppleID.auth.signIn();
      const payload = this.decodeJwtPayload(response.authorization.id_token) as unknown as AppleJwtPayload;
      this.onAuthSuccess({
        provider: 'apple',
        email: response.user?.email ?? payload.email,
        name: [response.user?.name?.firstName, response.user?.name?.lastName]
          .filter(Boolean)
          .join(' ') || undefined,
        idToken: response.authorization.id_token,
      });
    } catch (err) {
      console.error('[AuthService] Apple sign-in error:', err);
    }
  }

  signOut(): void {
    this.user.set(null);
    this.router.navigate(['/l1']);
  }

  private onAuthSuccess(user: OAuthUser): void {
    this.user.set(user);
    this.router.navigate(['/chat']);
  }

  private decodeJwtPayload(token: string): Record<string, unknown> {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch {
      return {};
    }
  }
}
