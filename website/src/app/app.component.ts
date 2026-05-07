/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgentChatComponent } from './agent-chat/agent-chat.component';
import { AgentService } from './agent.service';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 't-root',
  imports: [
    AgentChatComponent,
    RouterOutlet,
    MarkdownComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  agentService = inject(AgentService);
  markdownText = '## Empreendimento TCARVI';
}
