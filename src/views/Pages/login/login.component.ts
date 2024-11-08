import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterOutlet, RouterLinkActive,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


 isInvalid(controlName: string): boolean {
  const control = this.loginForm.get(controlName);
  return !!(control && control.invalid && (control.touched || control.dirty));
}

  loginForm: FormGroup;
  passwordVisible = false;
  successMessage: string | null = null;
  errors: any = {};

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],     
      password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  getFormError(controlName: string, displayName: string): string {
    const control = this.loginForm.get(controlName);

    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return `${displayName} is required`;
      }
    }

    return '';
  }

  onSubmit() {
    this.successMessage = null;
    this.errors = {};

    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.http.post(
        "https://localhost:44347/api/User/login",
        loginData,
        httpOptions
      ).subscribe({
        next: (response: any) => {
          this.successMessage = response.message;
          this.loginForm.reset();
        },
        error: (error) => {
          console.log("Error:", error);
          if (error.error.message) {
            this.errors = { general: error.error.message };
          }
          if (error.error.errors) {
            this.errors = error.error.errors;
          }
        }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
