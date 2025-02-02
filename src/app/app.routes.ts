import { Routes } from '@angular/router';
import { UsersComponent } from './view/users/users.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { ProductsComponent } from './view/products/products.component';
import { LoginComponent } from './view/login/login.component';
import { ProfileComponent } from './view/profile/profile.component';
import { AuthGuard } from './service/authGuard/auth-guard.service';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
