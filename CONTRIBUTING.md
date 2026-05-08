# Guia de Contribuição (CONTRIBUTING)

Este guia descreve como configurar o ambiente de desenvolvimento para contribuir com o projeto `website-tcarvi.com.br`.

## 1. Pré-requisitos

- Node.js (versão 22 LTS recomendada)
- Angular CLI (v20 ou superior)

## 2. Clone do Repositório

```bash
git clone https://github.com/tcarvi-engenheiro-eduardo-leal/website-tcarvi.git
```

### 2.1 Manutenção do Frontend (diretório `website`)

O frontend é uma aplicação Angular com SSR localizada no diretório `website/`. Para instalar as dependências e iniciar o servidor de desenvolvimento:

```bash
cd website
npm install
npm start   # escuta em http://localhost:4200
```

### 2.2 Build do Frontend

```bash
cd website
npm run build
```

Os artefatos gerados ficam em `website/dist/`.

### 2.3 Atualização de Dependências

Para manter o projeto atualizado, use os comandos padrão do Angular CLI:

```bash
cd website
ng update @angular/core @angular/cli
npm audit fix
```

Verifique sempre o arquivo `website/package.json` para confirmar as versões em uso antes de atualizar.

---

## 4. Backend Firebase

O backend do projeto é inteiramente baseado em serviços do Firebase, projeto `website-tcarvi`. Não há servidor dedicado separado — o próprio processo Node.js do Angular SSR serve como backend via **Firebase App Hosting**.

### 4.1 Firebase App Hosting

O serviço utilizado é o **Firebase App Hosting** (distinto do Firebase Hosting estático). Ele executa o servidor Node.js/Express gerado pelo Angular SSR diretamente na infraestrutura do Firebase.

Configuração em `firebase.json`:

```json
"apphosting": {
  "backendId": "website-tcarvi-backend",
  "rootDir": ".",
  "ignore": ["node_modules", ".git", "firebase-debug.log", "functions"]
}
```

O ponto de entrada do servidor é `src/server.ts`, que compila para `dist/app/server/server.mjs`. O Express exporta um `reqHandler` consumido pelo Firebase App Hosting:

```typescript
export const reqHandler = createNodeRequestHandler(app);
```

Para executar o servidor SSR localmente:

```bash
npm run build
npm run serve:ssr:app   # escuta em http://localhost:4000
```

### 4.2 Endpoint de IA — `/chatFlow`

O servidor expõe um endpoint HTTP POST em `/chatFlow` que integra o **Genkit** (framework de IA do Google) com o modelo **Gemini 2.5 Flash**.

Definido em `src/flows.ts` e registrado em `src/server.ts`:

```typescript
app.post('/chatFlow', expressHandler(chatFlow));
```

**Fluxo `chatFlow`:**

| Campo | Tipo | Descrição |
|---|---|---|
| `userInput` | `string` | Mensagem enviada pelo usuário |
| `sessionId` | `string` | ID da sessão de chat (mantém histórico) |
| `clearSession` | `boolean` | Se `true`, reinicia o histórico da sessão |

Retorno:

| Campo | Tipo | Descrição |
|---|---|---|
| `agentResponse` | `string` | Resposta gerada pelo modelo |
| `options` | `string[]` | Sugestões de resposta para o usuário (opcional) |

O agente responde em **português (pt-BR)** na primeira mensagem e depois detecta o idioma do usuário automaticamente. Possui a ferramenta `getDateTime` que retorna data e hora atuais quando solicitado.

O frontend consome este endpoint via `AgentService` (`src/app/agent.service.ts`) usando `runFlow` do SDK `genkit/beta/client`.

Para desenvolver com a UI do Genkit (inspecionar flows e traces):

```bash
npm run start:with-genkit-ui
```

### 4.3 Firebase Authentication

Autenticação via OAuth com três provedores suportados, integrada pelo `@angular/fire/auth`.

| Provedor | Método |
|---|---|
| Google | `GoogleAuthProvider` + `signInWithPopup` |
| Microsoft | `OAuthProvider('microsoft.com')` + `signInWithPopup` |
| Apple | `OAuthProvider('apple.com')` + escopos `email` e `name` |

A persistência da sessão é `browserSessionPersistence` — a sessão é encerrada ao fechar o navegador.

Após login bem-sucedido, o usuário é redirecionado para `/chat`. Após logout, redireciona para `/l1`.

O guard `authGuard` (`src/app/auth/auth.guard.ts`) protege rotas privadas: redireciona para `/l1` caso o usuário não esteja autenticado ou o Firebase não esteja disponível (ex.: SSR).

### 4.4 Firebase Analytics

Integrado via `@angular/fire/analytics` com rastreamento automático de telas (`ScreenTrackingService`). Measurement ID: `G-JT67R2V73N`.

Habilitado condicionalmente — só inicializa se a `apiKey` estiver presente no `firebaseConfig` (impede erros em ambientes sem configuração):

```typescript
...(firebaseConfig.apiKey
  ? [provideFirebaseApp(...), provideAuth(...), provideAnalytics(...)]
  : [])
```

### 4.5 Configuração do Firebase (`firebase.config.ts`)

As credenciais do Firebase ficam em `src/environments/firebase.config.ts`. Este arquivo contém a configuração pública do SDK web (não são segredos de servidor):

```typescript
export const firebaseConfig: FirebaseOptions = {
  apiKey: '...',
  authDomain: 'website-tcarvi.firebaseapp.com',
  projectId: 'website-tcarvi',
  storageBucket: 'website-tcarvi.firebasestorage.app',
  messagingSenderId: '...',
  appId: '...',
  measurementId: 'G-JT67R2V73N',
};
```

O projeto Firebase associado é `website-tcarvi` (definido em `.firebaserc`).

### 4.6 Variáveis de Ambiente necessárias

Para o Genkit funcionar em produção (Firebase App Hosting), a variável `GOOGLE_API_KEY` deve estar configurada no backend com uma chave válida do Google AI Studio com acesso ao modelo Gemini.

Para desenvolvimento local, configure:

```bash
export GOOGLE_API_KEY="sua-chave-aqui"
npm run start:with-genkit-ui
```

### 3.7 Serviços Firebase utilizados (resumo)

| Serviço | Uso |
|---|---|
| **Firebase App Hosting** | Executa o servidor Angular SSR + Express |
| **Firebase Authentication** | Login OAuth (Google, Microsoft, Apple) |
| **Firebase Analytics** | Rastreamento de telas e eventos |
| **Google AI (Gemini)** | Modelo LLM via Genkit no endpoint `/chatFlow` |
