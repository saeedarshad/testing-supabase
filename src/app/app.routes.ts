import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent)
      },
      {
        path: 'signup',
        loadComponent: () => import('./auth/signup/signup').then(m => m.SignupComponent)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./auth/reset-password/reset-password').then(m => m.ResetPasswordComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin').then(m => m.AdminComponent),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
