import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { CarRented } from '../models/car-rented.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiService, private router: Router, private auth: Auth) { }

  login(email: string, password: string): Observable<any> {
    let payload = { email, password };
    return this.apiService.login(payload);
  }

  signup( name: string,email: string, phoneNumber:string,password: string): Observable<any> {
    let payload = { name,email,phoneNumber,password };
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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Kiểm tra xem người dùng đã đăng nhập hay chưa
  }

  getUserRole(): string {
    return localStorage.getItem('role') || ''; // Lấy vai trò của người dùng từ localStorage
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.parseJwt(token);
      const userId = decodedToken ? decodedToken.sub : null; // 'sub' is the standard claim for subject (UserId)
      if (userId) {
        return userId;
      }
    }
    return null;
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  }
  getRentalContractsByUserId(): Observable<CarRented[]> {
    const userId = this.getUserId();
    if (userId) {
      return this.apiService.getRentalContractsByUserId(userId).pipe(
        catchError(this.handleError)
      );
    } else {
      throw new Error('User ID is not available');
    }
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
