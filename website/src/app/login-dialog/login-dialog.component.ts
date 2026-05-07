import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
})
export class LoginDialogComponent {
  private auth = inject(AuthService);

  signInWithGoogle(): void {
    this.auth.signInWithGoogle();
  }

  signInWithMicrosoft(): void {
    this.auth.signInWithMicrosoft();
  }

  signInWithApple(): void {
    this.auth.signInWithApple();
  }
}
