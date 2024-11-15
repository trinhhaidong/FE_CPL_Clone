import { Routes } from '@angular/router';
import { LoginComponent } from '../views/Pages/login/login.component';
import { HomePageComponent } from '../views/Pages/home-page/home-page.component';
import { RegisterComponent } from '../views/Pages/register/register.component';
import { AccessDeniedComponent } from '../views/About/access-denied/access-denied.component';
import { ResetPasswordComponent } from '../views/Pages/reset-password/reset-password.component';
import { AuthGuard } from '../services/auth.guard';
import { RoleGuard } from '../services/role.guard';
import { ChangePasswordComponent } from '../views/Pages/change-password/change-password.component';
import { ProfileComponent } from '../views/Pages/profile/profile.component';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    component: HomePageComponent,
    
  },
  {
    path: 'login',
    title: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    title: 'Register',
    component: RegisterComponent,
  },
  {
    path: 'reset-password',
    title: 'Reset Password',
    component: ResetPasswordComponent,
  },
  {
    path: 'change-password',
    title: 'Change Password',
    canActivate: [AuthGuard],
    component: ChangePasswordComponent,
  },
  {
    path: 'profile',
    title: 'Profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'access-denied',
    title: 'Not Found',
    component: AccessDeniedComponent,
  },
  { path: '', redirectTo: "/home", pathMatch: 'full' },
  { path: '**', redirectTo: "/access-denied" } // Chuyển hướng đến trang access-denied nếu URL không hợp lệ
];
