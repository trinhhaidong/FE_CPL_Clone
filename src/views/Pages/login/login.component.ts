import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'success') {
        this.successMessage = 'Registration successful. Please log in.';
      }
    });
  }

  isInvalid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return control ? control.invalid && control.touched : false;
  }

  getFormError(fieldName: string, fieldDisplayName: string): string {
    const control = this.loginForm.get(fieldName);
    if (control && control.hasError('required')) {
      return `${fieldDisplayName} is required`;
    } else if (control && control.hasError('email')) {
      return `${fieldDisplayName} is not a valid email`;
    }
    return '';
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  hideMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          this.successMessage = 'Login successful';
          this.errorMessage = null;
          localStorage.setItem("token", response.token);
          this.router.navigate(['/home']);
        },
        error => {
          this.successMessage = null;
          this.errorMessage = error.error.message || 'Login failed. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
    }
  }
}
