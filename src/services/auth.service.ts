import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private apiService: ApiService, private router:Router) { }


    
    login(email: string, password: string) {
        let payload = { email, password };
        this.apiService.login(payload).subscribe(
          response => {
            localStorage.setItem("token", response.token);
            this.router.navigate(['/home']);
          },
          error => {
            console.error('Error fetching data', error);
          }
        );
    }
    
  
    signup(email: string, password: string) {
        let payload = { email, password }
        this.apiService.signup(payload).subscribe(
            response => {
                localStorage.setItem("token", response.token);
                alert('Register successfully!');
                this.router.navigate(['/login']);
            },
            error => {
                console.error('Error fetching data', error);
            }
        );
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn(): boolean {
        if (localStorage.getItem("token")) {
            let tokenData = this.parseJwt(localStorage.getItem("token") ?? "");
            const currentTime = Math.floor(Date.now() / 1000);
            if (tokenData.exp >currentTime) {
                return true;
            } else {
                this.logout();
                return false;
            }
        };
        return false;
    }


    getRoles(): string {
        const token = localStorage.getItem('token');
        const decodedToken = this.parseJwt(token ?? '');
        return decodedToken?.role;
    }

    parseJwt(token: string) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
}
