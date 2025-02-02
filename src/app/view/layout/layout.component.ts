import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';


@Component({
  selector: 'app-layout',
  imports: [CommonModule, Menubar, ButtonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  standalone: true
})
export class LayoutComponent {
  items: MenuItem[] | undefined;

  constructor(private router: Router, private authService: AuthService) {
    this.items = [
      {
        label: 'Home',
        command: () => {
          this.router.navigate(['/dashboard']);
        },
      },
      {
        label: 'Users',
        command: () => {
          this.router.navigate(['/users']);
        },
      },
      {
        label: 'Products',
        command: () => {
          this.router.navigate(['/products']);
        },
      },
      {
        label: 'Profile',
        command: () => {
          this.router.navigate(['/profile']);
        },
      }
    ];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
