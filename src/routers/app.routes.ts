import { Routes } from '@angular/router';
import { LoginComponent } from '../views/Pages/login/login.component';
import { HomePageComponent } from '../views/Pages/home-page/home-page.component';
import { RegisterComponent } from '../views/Pages/register/register.component';
import { AccessDeniedComponent } from '../views/About/access-denied/access-denied.component';
import { ResetPasswordComponent } from '../views/Pages/reset-password/reset-password.component';
import { AuthGuard } from '../services/auth.guard';
import { RoleGuard } from '../services/role.guard';

export const routes: Routes = [

    {
        path: 'home',
        component: HomePageComponent,
        children: [
            {
                path: 'resetPassword', component: ResetPasswordComponent,
                title: 'Quản lý người dùng',
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    roles: ['Admin', 'Customer']
                }
            },            
            {
                path: 'access-denied', component: AccessDeniedComponent,
                title: 'Quản lý cài đặt',
                canActivate: [AuthGuard],
                data: {
                    roles: ['Admin']
                }
            },

            // Add more child routes as needed
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
    //    { path: '', redirectTo: 'login', pathMatch: 'full' }
    { path: '', redirectTo: "/home", pathMatch: 'full' },
    { path: '**', redirectTo: "/login" }
];





