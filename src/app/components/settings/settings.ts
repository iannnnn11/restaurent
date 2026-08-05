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

  orderReadyNotifications = true;
  menuNotifications = true;
  offerNotifications = false;
  emailNotifications = true;

  theme = 'light';
  language = 'English';
  dietaryPreference = 'Vegetarian';

  saveSettings(): void {
    console.log('Settings saved');
    alert('Settings saved successfully');
  }
}