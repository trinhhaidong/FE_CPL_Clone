import { Routes } from '@angular/router';
import { LoginComponent } from '../views/Pages/login/login.component';
import { HomePageComponent } from '../views/Pages/home-page/home-page.component';
import { RegisterComponent } from '../views/Pages/register/register.component';
import { AccessDeniedComponent } from '../views/About/access-denied/access-denied.component';
import { ResetPasswordComponent } from '../views/Pages/reset-password/reset-password.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'login', component: LoginComponent },  
    { path: 'register', component: RegisterComponent },
    { path: 'resetPassword', component: ResetPasswordComponent },

    { path: 'access-denied', component: AccessDeniedComponent },
    { path: '', redirectTo : "/home",pathMatch: 'full' },
    { path: '**', redirectTo : "/login" },

];
