import { Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { UsersComponent } from './view/users/users.component';
import { AppComponent } from './app.component';
import { LayoutComponent } from './view/layout/layout.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { ProductsComponent } from './view/products/products.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent },
    { path: 'products', component: ProductsComponent }
];
