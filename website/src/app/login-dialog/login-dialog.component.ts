import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatDialogModule],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
})
export class LoginDialogComponent {
  private readonly auth = inject(AuthService);
  private readonly dialogRef = inject(MatDialogRef<LoginDialogComponent>);

  constructor() {
    // Fecha o dialog assim que a autenticação for concluída
    effect(() => {
      if (this.auth.user()) {
        this.dialogRef.close();
      }
    });
  }

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
