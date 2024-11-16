import { Routes } from '@angular/router';
import { LoginComponent } from '../views/Pages/login/login.component';
import { HomePageComponent } from '../views/Pages/home-page/home-page.component';
import { RegisterComponent } from '../views/Pages/register/register.component';
import { AccessDeniedComponent } from '../views/About/access-denied/access-denied.component';
import { ResetPasswordComponent } from '../views/Pages/reset-password/reset-password.component';
import { CarGridComponent } from '../views/Cars/car-grid/car-grid.component'; 
import { AuthGuard } from '../services/auth.guard';
import { RoleGuard } from '../services/role.guard';
import { RentedCarsComponent } from '../views/Cars/rented-cars/rented-cars.component';
import { ChangePasswordComponent } from '../views/Pages/change-password/change-password.component';
import { ProfileComponent } from '../views/Pages/profile/profile.component';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    component: HomePageComponent,
    children: [      
    ]
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
  },{
    path: 'rented-cars',
    title: 'List Car Rented',
    component: RentedCarsComponent,
    canActivate: [AuthGuard],
    data: {
        roles: ['customer']
    }  
  },
  {
    path: 'car-grid',
    title: 'Car Grid',
    component: CarGridComponent,
   
    data: {
        roles: ['customer']
    } 
   },
   
  { path: '', redirectTo: "/home", pathMatch: 'full' },
  { path: '**', redirectTo: "/access-denied" } // Chuyển hướng đến trang access-denied nếu URL không hợp lệ
];
