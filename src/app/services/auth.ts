import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap, of } from 'rxjs';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ResetPasswordRequest {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Signal for reactive UI
  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor() {
    // Check for existing token on app start
    this.checkExistingAuth();
  }

  private checkExistingAuth(): void {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.setCurrentUser(user);
      } catch (error) {
        this.logout();
      }
    }
  }

  login(credentials: LoginRequest): Observable<any> {
    // Simulate API call - replace with actual endpoint
    return this.simulateLogin(credentials).pipe(
      tap(response => {
        if (response.success) {
          this.setCurrentUser(response.user);
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user_data', JSON.stringify(response.user));
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }

  signup(userData: SignupRequest): Observable<any> {
    // Simulate API call - replace with actual endpoint
    return this.simulateSignup(userData).pipe(
      tap(response => {
        if (response.success) {
          this.setCurrentUser(response.user);
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user_data', JSON.stringify(response.user));
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }

  resetPassword(request: ResetPasswordRequest): Observable<any> {
    // Simulate API call - replace with actual endpoint
    return this.simulateResetPassword(request);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.setCurrentUser(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated();
  }

  private setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
    this.currentUser.set(user);
    this.isAuthenticated.set(!!user);
  }

  // Simulate API responses - replace with actual HTTP calls
  private simulateLogin(credentials: LoginRequest): Observable<any> {
    // Demo users
    const demoUsers = [
      {
        id: '1',
        email: 'admin@demo.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin' as const
      },
      {
        id: '2',
        email: 'user@demo.com',
        password: 'user123',
        firstName: 'Regular',
        lastName: 'User',
        role: 'user' as const
      }
    ];

    const user = demoUsers.find(u => u.email === credentials.email && u.password === credentials.password);
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return of({
        success: true,
        user: userWithoutPassword,
        token: 'demo_token_' + user.id
      });
    }
    
    return of({ success: false, message: 'Invalid credentials' });
  }

  private simulateSignup(userData: SignupRequest): Observable<any> {
    // Simulate successful signup
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'user'
    };

    return of({
      success: true,
      user: newUser,
      token: 'demo_token_' + newUser.id
    });
  }

  private simulateResetPassword(request: ResetPasswordRequest): Observable<any> {
    // Simulate successful reset request
    return of({
      success: true,
      message: 'Password reset email sent successfully'
    });
  }
}
