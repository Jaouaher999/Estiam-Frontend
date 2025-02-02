import { CommonModule } from '@angular/common';
import { Component, OnInit, NgModule } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { LayoutComponent } from './view/layout/layout.component';
import Aura from '@primeng/themes/aura';
import { ConfirmationService, MessageService } from "primeng/api";
import { AuthService } from './service/auth/auth.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ConfirmationService, MessageService]
})
export class AppComponent {
  title = 'front-project';

  constructor(private primeng: PrimeNG, private authService: AuthService, private router: Router) {
    this.primeng.theme.set({
      preset: Aura,
      options: {
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities'
        }
      }
    });
  }
  ngOnInit() {
    this.primeng.ripple.set(true);
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
