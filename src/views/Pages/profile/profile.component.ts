import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: any = {};
  errorMessage: string | null = null;
  backendUrl: string = 'http://localhost:5000'; // URL gốc của backend

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      response => {
        this.userProfile = response;
        // Sử dụng URL ảnh trực tiếp từ internet để kiểm tra
        this.userProfile.photoUrl = 'https://th.bing.com/th?id=OIP.lAyVoPnPH3x8bL0Otns-jAHaFC&w=303&h=206&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2';
      },
      error => {
        this.errorMessage = error.error.message || 'Failed to load profile. Please try again.';
      }
    );
  }
}