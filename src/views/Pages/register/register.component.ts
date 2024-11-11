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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/;

    this.registerForm = this.fb.group({
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(passwordPattern)]],
    });
  }

  isInvalid(fieldName: string): boolean {
    const control = this.registerForm.get(fieldName);
    return control ? control.invalid && control.touched : false;
  }

  getFormError(fieldName: string, fieldDisplayName: string): string {
    const control = this.registerForm.get(fieldName);

    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return `${fieldDisplayName} is required`;
      } else if (control.errors['minlength']) {
        return `${fieldDisplayName} must be at least ${control.errors['minlength'].requiredLength} characters`;
      } else if (control.errors['pattern']) {
        return `${fieldDisplayName} format is incorrect`;
      } else if (control.errors['email']) {
        return 'Please enter a valid email';
      }
    }

    return '';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { email, password, phoneNumber } = this.registerForm.value;
      this.authService.signup(email, password, phoneNumber).subscribe(
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
