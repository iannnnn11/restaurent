import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {

  orderReadyNotification = true;
  dailyMenuNotification = true;
  offerNotification = false;
  emailNotification = true;
  soundNotification = true;

  theme = 'Light';
  language = 'English';
  defaultCategory = 'Recommended';
  dietaryPreference = 'Vegetarian';

  savedMessage = '';

  saveSettings(): void {
    this.savedMessage = 'Settings updated successfully.';

    setTimeout(() => {
      this.savedMessage = '';
    }, 3000);
  }

  resetSettings(): void {
    this.orderReadyNotification = true;
    this.dailyMenuNotification = true;
    this.offerNotification = false;
    this.emailNotification = true;
    this.soundNotification = true;

    this.theme = 'Light';
    this.language = 'English';
    this.defaultCategory = 'Recommended';
    this.dietaryPreference = 'Vegetarian';

    this.savedMessage = 'Settings reset to default.';
  }
}