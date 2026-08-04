import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Employee } from '../../models/employee';

interface Activity {
  title: string;
  description: string;
  time: string;
  icon: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  employee: Employee | null = null;

  activities: Activity[] = [
    {
      title: 'Logged into account',
      description: 'Employee account login was successful.',
      time: 'Today, 10:30 AM',
      icon: 'fa-right-to-bracket'
    },
    {
      title: 'Updated menu item',
      description: 'Changed the price of Paneer Tikka.',
      time: 'Yesterday, 4:15 PM',
      icon: 'fa-utensils'
    },
    {
      title: 'Approved reservation',
      description: 'Approved a reservation for Table 8.',
      time: 'Yesterday, 2:10 PM',
      icon: 'fa-calendar-check'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedEmployee =
      sessionStorage.getItem('loggedInEmployee');

    if (storedEmployee) {
      this.employee = JSON.parse(storedEmployee);
    }
  }

  getInitials(): string {
    if (!this.employee) {
      return 'EM';
    }

    return this.employee.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  logout(): void {
    sessionStorage.removeItem('loggedInEmployee');
    this.router.navigate(['/login']);
  }
}