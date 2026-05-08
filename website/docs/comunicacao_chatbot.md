# Análise do Fluxo de Comunicação do Chatbot

## Visão geral das camadas

```
Usuário
  │
  ▼
AgentChatComponent          (src/app/agent-chat/)
  │  [(ngModel)] → userInput local
  │  onSubmit() → agentService.updateChatFromUser()
  ▼
AgentService                (src/app/agent.service.ts)
  │  userInput signal → dispara agentResource
  │  agentResource: resource<AgentResponse>
  │    loader: runFlow({ url: '/chatFlow', input })
  ▼
genkit/beta/client          (runFlow)
  │  POST /chatFlow  com body { input: { userInput, sessionId, clearSession } }
  ▼
Express server              (src/server.ts)
  │  app.post('/chatFlow', expressHandler(chatFlow))
  ▼
Genkit flow                 (src/flows.ts)
  │  chatFlow: valida input, gerencia sessão, chama Gemini
  ▼
Google AI — Gemini 2.5 Flash
  │  requer GEMINI_API_KEY no processo
  ▼
Resposta: { agentResponse: string, options: string[] }
```

---

## Fluxo detalhado — inicialização da página `/chat`

| Passo | Local | Detalhe |
|---|---|---|
| 1 | Angular bootstrap | `AgentChatComponent` é instanciado após autenticação bem-sucedida |
| 2 | `AgentService` constructor | `agentResource` é criado; o loader é executado **imediatamente** |
| 3 | Loader (1ª execução) | Lê reativamente: `userInput()=''`, `clearSession()=true`, `sessionId()='<id gerado>'` |
| 4 | `runFlow` | POST `/chatFlow` com `{ userInput:'', clearSession:true, sessionId:'<id>' }` |
| 5 | `flows.ts` | `userInput` vazio → substituído por `'Olá'`; cria nova sessão Genkit |
| 6 | Gemini | Responde em pt-BR com saudação e opções |
| 7 | `agentResource.value()` | Atualiza com `{ agentResponse:'Olá,...', options:[...] }` |
| 8 | `clearSession` linkedSignal | **Fonte muda** (`''` → resposta); recomputa: `!previous = false` |
| 9 | **BUG — 2ª execução** | `clearSession` mudou → resource re-dispara; POST `/chatFlow` com mesmo `userInput=''` |
| 10 | `flows.ts` | 2ª saudação gerada na mesma sessão (conversa duplicada) |
| 11 | `clearSession` linkedSignal | `!previous = false` (objeto é truthy) → sem mudança → loop encerrado |

---

## Fluxo detalhado — envio de mensagem pelo usuário

| Passo | Local | Detalhe |
|---|---|---|
| 1 | Template | Usuário digita no `<input [(ngModel)]="userInput">` |
| 2 | `onSubmit()` | Chama `agentService.updateChatFromUser(this.userInput)` |
| 3 | `updateChatFromUser` | Adiciona item `USER` em `chat`; chama `agentService.userInput.set(texto)` |
| 4 | `agentResource` loader | `userInput()` mudou → loader re-executa |
| 5 | Loader | Lê `userInput()`, `sessionId()`, `clearSession()` (todos como dependências reativas) |
| 6 | `runFlow` | POST `/chatFlow` com o texto do usuário |
| 7 | `flows.ts` | Continua sessão existente; envia prompt ao Gemini |
| 8 | Gemini | Gera resposta |
| 9 | `agentResource.value()` | Atualiza com nova resposta |
| 10 | `chat` linkedSignal | Adiciona item `AGENT` na lista; UI renderiza a bolha de resposta |

---

## Bugs identificados

### Bug 1 — Dupla chamada na inicialização (lógico)

**Arquivo**: [agent.service.ts](../src/app/agent.service.ts)

O `agentResource` lê `clearSession()` como dependência reativa dentro do loader. Após a 1ª resposta do servidor, `clearSession` muda de `true` para `false`, o que re-dispara o loader automaticamente com o mesmo `userInput=''`. O resultado é:

- 2 chamadas POST ao servidor na abertura da página
- 2 mensagens de saudação geradas na mesma sessão
- Consumo desnecessário de tokens do Gemini

**Raiz do problema**: `clearSession` e `sessionId` não deveriam ser dependências reativas do resource — só `userInput` deve disparar o loader.

---

### Bug 2 — Sem feedback de erro na UI (UX)

**Arquivo**: [agent-chat.component.html](../src/app/agent-chat/agent-chat.component.html)

Quando `runFlow` falha (500, 401, rede), o Angular `resource` coloca o recurso em estado `error`, mas o template não verifica `agentService.agentResource.error()`. O resultado visível para o usuário é: **nada acontece** — a barra de loading some e nenhuma mensagem aparece, sem indicação do motivo.

Isso torna o Bug 3 (abaixo) completamente invisível para o usuário.

---

### Bug 3 — `GEMINI_API_KEY` ausente no deploy em produção (configuração)

**Arquivo**: [apphosting.yaml](../apphosting.yaml)

A referência ao secret `GEMINI_API_KEY` foi adicionada ao `apphosting.yaml`, mas o build que incluiu essa mudança **falhou** com o erro `Misconfigured Secret` (permissão negada no Secret Manager). O Firebase App Hosting manteve em produção o build anterior — que não injeta a variável `GEMINI_API_KEY`.

Consequência: o plugin `googleAI()` do Genkit inicializa sem chave de API. Qualquer chamada ao endpoint `/chatFlow` retorna erro 500. O Bug 2 oculta esse erro da interface.

---

## Solução

### Fix 1 — Corrigir dupla chamada (código)

Usar `untracked()` do Angular para ler `sessionId` e `clearSession` dentro do loader **sem** criar dependência reativa. Apenas `userInput` deve ser dependência do resource.

### Fix 2 — Exibir erros na UI (código)

Adicionar bloco `@if (agentService.agentResource.error())` no template com mensagem de erro visível.

### Fix 3 — Restaurar GEMINI_API_KEY em produção (deploy)

```bash
# Garantir permissão ao service account do App Hosting
firebase apphosting:secrets:grantaccess GEMINI_API_KEY --backend website-tcarvi-backend

# Disparar novo build via push
git push
```
