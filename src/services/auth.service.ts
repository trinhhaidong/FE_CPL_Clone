import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiService, private router: Router, private auth: Auth) { }

  login(email: string, password: string): Observable<any> {
    let payload = { email, password };
    return this.apiService.login(payload);
  }

  signup(email: string, password: string, phoneNumber: string): Observable<any> {
    let payload = { email, password, phoneNumber };
    return this.apiService.signup(payload);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
  loginWithGoogle(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    return new Observable(observer => {
      signInWithPopup(this.auth, provider).then(
        res => observer.next(res),
        err => observer.error(err)
      );
    });
  
  }
  // logout(): Promise<void> {
  //   return this.auth.signOut();
  // }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenData = this.parseJwt(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (tokenData && tokenData.exp > currentTime) {
        return true;
      } else {
        this.logout();
        return false;
      }
    }
    return false;
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  getRoles(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.parseJwt(token);
      return decodedToken ? decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : '';
    }
    return '';
  }


  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
