import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  verifying = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const email = params['email'];

      if (token && email) {
        this.verifyEmail(token, email);
      } else {
        this.errorMessage = 'Invalid verification link';
        this.verifying = false;
      }
    });
  }

  private verifyEmail(token: string, email: string): void {
    this.authService.verifyEmail(token, email).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.errorMessage = null;
        this.verifying = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        this.successMessage = null;
        this.verifying = false;
      }
    });
  }
}
