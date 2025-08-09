import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticatedUser()) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.currentUser();
  
  if (currentUser && currentUser.role === 'admin') {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
