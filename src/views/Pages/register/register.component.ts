import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showPassword: boolean =false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/;

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(passwordPattern)]],
    });
  }

  isInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getFormError(fieldName: string): string {
    const control = this.registerForm.get(fieldName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['email']) {
        return 'Invalid email format';
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
    if (this.registerForm.valid) {
      const { name, email, phoneNumber, password } = this.registerForm.value;
      this.authService.signup(name, email, phoneNumber, password).subscribe(
        response => {
          this.successMessage = 'Register successful';
          this.errorMessage = null;
          localStorage.removeItem("token"); // Xóa token sau khi đăng ký thành công
          this.router.navigate(['/login'], { queryParams: { registered: 'success' } });
        },
        error => {
          this.successMessage = null;
          this.errorMessage = error.error.message || 'Register failed. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
    }
  }
}
