import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private location: Location
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // If user is logged in, stay on current page
      this.location.back();
      return false;
    }
    return true;
  }
}
