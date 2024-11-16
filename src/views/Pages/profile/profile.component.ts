import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: any = {};
  errorMessage: string | null = null;
  successMessage: string | null = null;
  editMode: boolean = false;
  profileForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

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

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.profileForm.patchValue({
        name: this.userProfile.name,
        phoneNumber: this.userProfile.phoneNumber
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.authService.uploadAvatar(file).subscribe({
        next: (response) => {
          this.userProfile.photoUrl = response.filePath;
          this.successMessage = 'Avatar updated successfully';
          setTimeout(() => this.successMessage = null, 3000);
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Failed to update avatar';
          setTimeout(() => this.errorMessage = null, 3000);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const { name, phoneNumber } = this.profileForm.value;
      this.authService.updateProfile(name, phoneNumber).subscribe({
        next: () => {
          this.userProfile.name = name;
          this.userProfile.phoneNumber = phoneNumber;
          this.successMessage = 'Profile updated successfully';
          this.editMode = false;
          setTimeout(() => this.successMessage = null, 3000);
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Failed to update profile';
          setTimeout(() => this.errorMessage = null, 3000);
        }
      });
    }
  }
}