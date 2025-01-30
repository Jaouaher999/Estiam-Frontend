import { Router, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, Menubar, ButtonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  standalone: true
})
export class LayoutComponent {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {
    this.items = [
      {
        label: 'Home',
        command: () => {
          this.router.navigate(['/']);
        },
      },
      {
        label: 'Users',
        command: () => {
          this.router.navigate(['/users']);
        },
      },
      {
        label: 'Login',
        command: () => {
          this.router.navigate(['/login']);
        },
      },
      {
        label: 'Products',
        command: () => {
          this.router.navigate(['/products']);
        },
      },
    ];
  }
}
