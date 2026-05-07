/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { AgentService } from '../agent.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-agent-chat',
  imports: [MatIconModule, MatButtonModule, FormsModule, MatProgressBarModule],
  templateUrl: './agent-chat.component.html',
  styleUrl: './agent-chat.component.scss'
})
export class AgentChatComponent {
  agentService = inject(AgentService);
  auth = inject(AuthService);
  userInput = '';

  onSubmit(): void {
    if (this.userInput !== '') {
      this.agentService.updateChatFromUser(this.userInput);
      this.userInput = '';
    }
  }

  providerLabel(provider: string): string {
    return { google: 'Google', microsoft: 'Microsoft', apple: 'Apple' }[provider] ?? provider;
  }
}
