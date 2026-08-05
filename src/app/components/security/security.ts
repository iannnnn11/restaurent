import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './security.html',
  styleUrl: './security.css'
})
export class Security {

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  twoFactorEnabled = false;
  loginAlertsEnabled = true;

  message = '';
  messageType: 'success' | 'danger' = 'success';

  changePassword(): void {
    if (
      !this.currentPassword ||
      !this.newPassword ||
      !this.confirmPassword
    ) {
      this.showMessage(
        'Please fill in all password fields.',
        'danger'
      );

      return;
    }

    if (this.newPassword.length < 8) {
      this.showMessage(
        'New password must contain at least 8 characters.',
        'danger'
      );

      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.showMessage(
        'New password and confirm password do not match.',
        'danger'
      );

      return;
    }

    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';

    this.showMessage(
      'Password updated successfully.',
      'success'
    );
  }

  signOutAllDevices(): void {
    this.showMessage(
      'You have been signed out from all other devices.',
      'success'
    );
  }

  private showMessage(
    message: string,
    type: 'success' | 'danger'
  ): void {
    this.message = message;
    this.messageType = type;

    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}