import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

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
  signInWithGoogle(): void {
    console.log('Sign in with Google');
  }

  signInWithMicrosoft(): void {
    console.log('Sign in with Microsoft');
  }

  signInWithApple(): void {
    console.log('Sign in with Apple');
  }
}
