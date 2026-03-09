import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  showPassword = false;

  // Toast variables
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'warning' = 'error';
  showToast: boolean = false;

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  showCustomToast(message: string, type: 'success' | 'error' | 'warning') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  login() {

    if (!this.email.trim()) {
      this.showCustomToast('Please enter your email address.', 'warning');
      return;
    }

    if (!this.password.trim()) {
      this.showCustomToast('Please enter your password.', 'warning');
      return;
    }

    if (this.email !== 'admin@mcdonalds.com') {
      this.showCustomToast('No account found with this email.', 'error');
      return;
    }

    if (this.password !== 'admin') {
      this.showCustomToast('Incorrect password. Please try again.', 'error');
      return;
    }

    // Success
    localStorage.setItem('isLoggedIn', 'true');
    this.showCustomToast('Login successful!', 'success');

    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1000);
  }
}