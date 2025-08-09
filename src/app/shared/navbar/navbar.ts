import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, User } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink,
    MenubarModule,
    ButtonModule,
    AvatarModule,
    MenuModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.currentUser;
  isAuthenticated = this.authService.isAuthenticated;

  navigationItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Admin',
      icon: 'pi pi-users',
      routerLink: '/admin',
      visible: this.currentUser()?.role === 'admin'
    }
  ];

  userMenuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => this.router.navigate(['/profile'])
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => this.router.navigate(['/settings'])
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ];

  logout(): void {
    this.authService.logout();
  }

  getUserInitials(user: User | null): string {
    if (!user) return '';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }
}
