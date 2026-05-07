/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Chat, genkit, Session } from 'genkit/beta';
import { googleAI, gemini } from '@genkit-ai/googleai';
import { parse } from 'partial-json';
import { z } from 'zod';

const model = gemini('gemini-2.5-flash');

const ai = genkit({
  plugins: [googleAI()],
  model
});
  
let session: Session;

const getDateTime = ai.defineTool(
  {
    name: 'getDateTime',
    description: 'Gets the current date and time',
    outputSchema: z.string(),
  },
  async (input) => {
    // Here, we would typically make an API call or database query. For this
    // example, we just return the date and time.
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return `The current date and time is ${formattedDate} ${formattedTime}`;
  }
);
  
/**
 * Define a flow to execute. You can call any flow using this pattern,
 * such as those that use `generate()` to generate text or images
 * outside the context of a chat session.
 */
export const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: z.object({
      userInput: z.string(),
      sessionId: z.string(),
      clearSession: z.boolean()
    }),
    outputSchema: z.object({
      agentResponse: z.string(),
      options: z.optional(z.array(z.string()))
    })
  },
  async ({ userInput, sessionId, clearSession }) => {
    if (userInput.length === 0) {
      userInput = 'Olá';
    }

    let chat: Chat;
    if (clearSession) {
        session = ai.createSession({ sessionId });
        await session.updateMessages(sessionId, []);
    }
    chat = session.chat({ sessionId, model, tools: [getDateTime] });
    const prompt = `
    Você é um assistente de propósito geral que responde a uma variedade de perguntas do usuário.

    Regras de idioma:
    - Se esta for a primeira mensagem da conversa (saudação inicial, sem contexto prévio do usuário), responda em português do Brasil.
    - Caso contrário, detecte o idioma da última mensagem do usuário e responda exatamente nesse mesmo idioma.
    - Tanto o campo "agentResponse" quanto cada item de "options" devem estar no idioma escolhido segundo as regras acima.

    Se o usuário pedir a data e a hora, chame a ferramenta apropriada para obtê-las.

    Entrada do usuário: ${userInput}

    Responda ao usuário e, se você fizer uma pergunta a ele, forneça algumas opções
    para que ele possa respondê-la. Você pode fazer perguntas de esclarecimento para
    obter mais informações.

    A resposta final deve ser estruturada da seguinte forma:

    {
      agentResponse: "INSIRA SUA RESPOSTA AQUI",
      options: [ // opções para responder a agentResponse, caso seja uma pergunta
        "opcao_1",
        "opcao_2",
        "opcao_3",
        ...
      ]
    }

    Responda apenas como JSON. Coloque todos os valores de campo entre aspas duplas. Não use aspas simples.`

    const { text } = await chat.send({ prompt });
    return parse(maybeStripMarkdown(text));
  }
);

const markdownRegex = /^\s*(```json)?((.|\n)*?)(```)?\s*$/i;
function maybeStripMarkdown(withMarkdown: string) {
  const mdMatch = markdownRegex.exec(withMarkdown);
  if (!mdMatch) {
    return withMarkdown;
  }
  return mdMatch[2];
}