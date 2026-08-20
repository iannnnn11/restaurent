import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    this.errorMessage = '';

    if (!this.username.trim()) {
      this.errorMessage = 'Please enter your Admin ID.';
      return;
    }

    if (!this.password.trim()) {
      this.errorMessage = 'Please enter your password.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }

    const success = this.authService.login(
      this.username.trim(),
      this.password
    );

    if (success) {
      this.router.navigate(['/dash/home']);
    } else {
      this.errorMessage = 'Invalid Admin ID or password.';
    }
  }
}