import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { authCredentials } from '../../environments/auth-credentials';
import type { PublicClientApplication, AuthenticationResult } from '@azure/msal-browser';

export interface OAuthUser {
  provider: 'google' | 'microsoft' | 'apple';
  email?: string;
  name?: string;
  accessToken?: string;
  idToken?: string;
}

// Tipagens para SDKs externos carregados via <script>
interface GoogleTokenClient {
  requestAccessToken(): void;
}
interface GoogleAccounts {
  oauth2: {
    initTokenClient(config: {
      client_id: string;
      scope: string;
      callback: (response: { access_token?: string; error?: string }) => void;
    }): GoogleTokenClient;
  };
}
interface AppleAuthResponse {
  authorization: { code: string; id_token: string; state: string };
  user?: { name?: { firstName?: string; lastName?: string }; email?: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private msalInstance: PublicClientApplication | null = null;

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
    // Processa redirect de volta do Microsoft (se houver)
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
          const user: OAuthUser = { provider: 'google', accessToken: response.access_token };
          this.onAuthSuccess(user);
        },
      })
      .requestAccessToken();
  }

  async signInWithMicrosoft(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.msalInstance) await this.initialize();
    if (!this.msalInstance) {
      console.error('[AuthService] MSAL não inicializado. Verifique MICROSOFT_CLIENT_ID.');
      return;
    }

    try {
      const result: AuthenticationResult = await this.msalInstance.loginPopup({
        scopes: ['openid', 'email', 'profile'],
      });
      const user: OAuthUser = {
        provider: 'microsoft',
        email: result.account?.username,
        name: result.account?.name ?? undefined,
        accessToken: result.accessToken,
        idToken: result.idToken,
      };
      this.onAuthSuccess(user);
    } catch (err) {
      console.error('[AuthService] Microsoft sign-in error:', err);
    }
  }

  async signInWithApple(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const AppleID = (window as unknown as { AppleID?: { auth?: {
      init(config: object): void;
      signIn(): Promise<AppleAuthResponse>;
    } } }).AppleID;

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
      const user: OAuthUser = {
        provider: 'apple',
        email: response.user?.email,
        name: [response.user?.name?.firstName, response.user?.name?.lastName]
          .filter(Boolean)
          .join(' ') || undefined,
        idToken: response.authorization.id_token,
      };
      this.onAuthSuccess(user);
    } catch (err) {
      console.error('[AuthService] Apple sign-in error:', err);
    }
  }

  private onAuthSuccess(user: OAuthUser): void {
    console.log(`[AuthService] Login bem-sucedido via ${user.provider}:`, user);
    // TODO: armazenar sessão, navegar para rota protegida, etc.
  }
}
