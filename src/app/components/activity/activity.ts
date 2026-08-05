import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ActivityItem {
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'order' | 'login' | 'profile' | 'security' | 'settings';
  amount?: number;
  status?: string;
}

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './activity.html',
  styleUrl: './activity.css'
})
export class Activity {

  selectedFilter = 'All';

  filters = [
    'All',
    'Orders',
    'Account',
    'Security'
  ];

  activities: ActivityItem[] = [
    {
      title: 'Pantry order collected',
      description: 'Token #24 · Veg Sandwich and Cold Coffee',
      date: 'Today',
      time: '1:35 PM',
      type: 'order',
      amount: 110,
      status: 'Collected'
    },
    {
      title: 'Order placed',
      description: 'Token #24 · Order sent to the pantry counter',
      date: 'Today',
      time: '1:15 PM',
      type: 'order',
      amount: 110,
      status: 'Completed'
    },
    {
      title: 'Account login',
      description: 'Chrome on Windows · Pune Office',
      date: 'Today',
      time: '9:12 AM',
      type: 'login'
    },
    {
      title: 'Profile information updated',
      description: 'Phone number and dietary preference changed',
      date: 'Yesterday',
      time: '5:20 PM',
      type: 'profile'
    },
    {
      title: 'Security settings changed',
      description: 'New login alerts enabled',
      date: '2 August 2026',
      time: '3:05 PM',
      type: 'security'
    },
    {
      title: 'Pantry preference updated',
      description: 'Default category changed to Coffee & Tea',
      date: '1 August 2026',
      time: '11:40 AM',
      type: 'settings'
    }
  ];

  get filteredActivities(): ActivityItem[] {
    if (this.selectedFilter === 'Orders') {
      return this.activities.filter(
        activity => activity.type === 'order'
      );
    }

    if (this.selectedFilter === 'Security') {
      return this.activities.filter(
        activity =>
          activity.type === 'security' ||
          activity.type === 'login'
      );
    }

    if (this.selectedFilter === 'Account') {
      return this.activities.filter(
        activity =>
          activity.type === 'profile' ||
          activity.type === 'settings'
      );
    }

    return this.activities;
  }

  getActivityIcon(type: ActivityItem['type']): string {
    switch (type) {
      case 'order':
        return 'fa-bag-shopping';

      case 'login':
        return 'fa-right-to-bracket';

      case 'profile':
        return 'fa-user-pen';

      case 'security':
        return 'fa-shield-halved';

      case 'settings':
        return 'fa-sliders';

      default:
        return 'fa-circle';
    }
  }

  getActivityClass(type: ActivityItem['type']): string {
    return `activity-${type}`;
  }
}