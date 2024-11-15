import { Routes } from '@angular/router';
import { LoginComponent } from '../views/Pages/login/login.component';
import { HomePageComponent } from '../views/Pages/home-page/home-page.component';
import { RegisterComponent } from '../views/Pages/register/register.component';
import { AccessDeniedComponent } from '../views/About/access-denied/access-denied.component';
import { ResetPasswordComponent } from '../views/Pages/reset-password/reset-password.component';
import { CarGridComponent } from '../views/Cars/car-grid/car-grid.component'; 
import { AuthGuard } from '../services/auth.guard';
import { RoleGuard } from '../services/role.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      // {
      //   path: 'access-denied',
      //   component: ,
      //   title: 'Quản lý cài đặt',
      //   canActivate: [AuthGuard, RoleGuard],
      //   data: {
      //     roles: ['customer'] // Vai trò được phép truy cập
      //   }
      // },
      // Add more child routes as needed
      {
        path: 'car-grid',
        title: 'Car Grid',
        component: CarGridComponent,
        canActivate: [AuthGuard],
        data: {
            roles: ['customer']
        } 
    },
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
  },

  { path: '', redirectTo: "/home", pathMatch: 'full' },
  { path: '**', redirectTo: "/access-denied" } // Chuyển hướng đến trang access-denied nếu URL không hợp lệ
];
