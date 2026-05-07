import { Routes } from '@angular/router';
import { L1Component } from './l-1/l-1.component';
import { AgentChatComponent } from './agent-chat/agent-chat.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'l1'
  },
  {
    path: 'l1',
    component: L1Component
  },
  {
    path: 'chat',
    component: AgentChatComponent
  }
];