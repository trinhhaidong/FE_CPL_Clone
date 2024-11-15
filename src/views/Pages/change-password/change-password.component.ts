import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/;
    
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(passwordPattern)
      ]]
    });
  }

  togglePasswordVisibility(field: 'old' | 'new'): void {
    if (field === 'old') {
      this.showOldPassword = !this.showOldPassword;
    } else {
      this.showNewPassword = !this.showNewPassword;
    }
  }

  isInvalid(fieldName: string): boolean {
    const field = this.changePasswordForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFormError(fieldName: string): string {
    const control = this.changePasswordForm.get(fieldName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['minlength']) {
        return 'Password must be at least 8 characters long';
      }
      if (control.errors['pattern']) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character';
      }
    }
    return '';
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const { oldPassword, newPassword } = this.changePasswordForm.value;
      this.authService.changePassword(oldPassword, newPassword).subscribe({
        next: () => {
          this.successMessage = 'Password changed successfully';
          this.errorMessage = null;
          this.authService.logout(); // Đăng xuất người dùng
          this.router.navigate(['/login'], { queryParams: { passwordChanged: 'success' } });
        },
        error: (error) => {
          this.successMessage = null;
          this.errorMessage = error.error.message || 'Password change failed. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
    }
  }
}
