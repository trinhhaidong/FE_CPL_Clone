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

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    children: [      
    ]
  },
  {
    path: 'login',
    title: 'Đăng nhập',
    component: LoginComponent,
  },
  {
    path: 'register',
    title: 'Đăng ký',
    component: RegisterComponent,
  },
  {
    path: 'reset-password',
    title: 'Đặt lại mật khẩu',
    component: ResetPasswordComponent,
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
  
  { path: '', redirectTo: "/home", pathMatch: 'full' },
  { path: '**', redirectTo: "/access-denied" } // Chuyển hướng đến trang access-denied nếu URL không hợp lệ
];
