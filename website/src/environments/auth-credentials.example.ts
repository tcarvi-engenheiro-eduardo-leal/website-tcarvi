// Template de credenciais OAuth2.
// Copie este arquivo para auth-credentials.ts e preencha com os valores de .auth/*.env
// O arquivo auth-credentials.ts está no .gitignore e nunca deve ser commitado.

export const authCredentials = {
  google: {
    // GOOGLE_CLIENT_ID em .auth/google.env
    clientId: '',
  },
  microsoft: {
    // MICROSOFT_CLIENT_ID em .auth/microsoft.env
    clientId: '',
    // MICROSOFT_TENANT_ID em .auth/microsoft.env
    // Use 'common' para contas pessoais e corporativas
    tenantId: 'common',
  },
  apple: {
    // APPLE_SERVICE_ID em .auth/apple.env
    serviceId: '',
    // APPLE_REDIRECT_URI em .auth/apple.env (deve ser HTTPS)
    redirectURI: '',
  },
} as const;
