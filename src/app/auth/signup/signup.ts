import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    MessageModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  signupForm: FormGroup;
  loading = signal(false);
  errorMessage = signal('');

  constructor() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.loading.set(true);
      this.errorMessage.set('');
      
      const { confirmPassword, ...signupData } = this.signupForm.value;
      
      this.authService.signup(signupData).subscribe({
        next: (response) => {
          this.loading.set(false);
          if (!response.success) {
            this.errorMessage.set(response.message || 'Signup failed');
          }
        },
        error: (error) => {
          this.loading.set(false);
          this.errorMessage.set('An error occurred during signup');
        }
      });
    }
  }

  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }
}
