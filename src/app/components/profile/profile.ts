import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  logout(): void {
    console.log('User logged out');
  }
}