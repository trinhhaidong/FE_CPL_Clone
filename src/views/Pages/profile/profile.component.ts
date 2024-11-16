import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api/api.service';
declare var $: any; // For jQuery

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  userProfile: any = {};
  errorMessage: string | null = null;
  successMessage: string | null = null;
  editMode: boolean = false;
  profileForm: FormGroup;
  avatarUrl: string = 'assets/images/default-profile.png';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  ngOnInit(): void {
    this.loadProfile();
    this.initializeMagnificPopup();
  }

  ngAfterViewInit() {
    $('.profile-photo-link').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: true,
      fixedContentPos: true,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      image: {
        verticalFit: true
      },
      zoom: {
        enabled: true,
        duration: 300
      }
    });
  }

  private loadProfile(): void {
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.userProfile = response;
        this.loadAvatar(); // Load avatar sau khi có profile
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Failed to load profile';
      }
    });
  }

  private loadAvatar(): void {
    this.apiService.getAvatarUrl().subscribe({
      next: (blob: Blob) => {
        this.avatarUrl = this.apiService.createImageFromBlob(blob);
      },
      error: (error) => {
        console.error('Error loading avatar:', error);
        this.avatarUrl = 'assets/images/default-profile.png';
      }
    });
  }

  private initializeMagnificPopup(): void {
    $('.profile-photo-link').magnificPopup({
      type: 'image',
      closeOnContentClick: false, // Changed to false to prevent accidental closing
      enableEscapeKey: true,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close">×</button>',
      tLoading: 'Loading...',
      image: {
        verticalFit: true,
        tError: '<a href="%url%">The image</a> could not be loaded.'
      },
      zoom: {
        enabled: true,
        duration: 300
      }
    });
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
          // Sau khi upload thành công, load lại avatar
          this.loadAvatar();
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