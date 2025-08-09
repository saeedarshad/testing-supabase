import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    CardModule,
    MessageModule
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  resetForm: FormGroup;
  loading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  constructor() {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      this.loading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');
      
      this.authService.resetPassword(this.resetForm.value).subscribe({
        next: (response) => {
          this.loading.set(false);
          if (response.success) {
            this.successMessage.set(response.message);
          } else {
            this.errorMessage.set(response.message || 'Reset failed');
          }
        },
        error: (error) => {
          this.loading.set(false);
          this.errorMessage.set('An error occurred during password reset');
        }
      });
    }
  }

  get email() { return this.resetForm.get('email'); }
}
