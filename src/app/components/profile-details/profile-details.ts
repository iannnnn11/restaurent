import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface EmployeeProfile {
  firstName: string;
  lastName: string;
  employeeId: string;
  designation: string;
  department: string;
  workEmail: string;
  phone: string;
  officeLocation: string;
  joiningDate: string;
  manager: string;
  dietaryPreference: string;
  bio: string;
}

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './profile-details.html',
  styleUrl: './profile-details.css'
})
export class ProfileDetails {

  isEditing = false;
  savedMessage = '';

  profile: EmployeeProfile = {
    firstName: 'Ian',
    lastName: 'Honey',
    employeeId: 'JTX-1024',
    designation: 'Software Engineer',
    department: 'Engineering',
    workEmail: 'ian.honey@jodetx.com',
    phone: '+91 98765 43210',
    officeLocation: 'Pune Office',
    joiningDate: '2025-07-15',
    manager: 'Rahul Sharma',
    dietaryPreference: 'Vegetarian',
    bio: 'Frontend developer working with Angular and building better employee experiences.'
  };

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.savedMessage = '';
  }

  saveProfile(): void {
    this.isEditing = false;
    this.savedMessage = 'Profile updated successfully.';

    setTimeout(() => {
      this.savedMessage = '';
    }, 3000);
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.savedMessage = '';
  }
}