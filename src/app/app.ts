import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth';
import { NavbarComponent } from './shared/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  authService = inject(AuthService);
}
