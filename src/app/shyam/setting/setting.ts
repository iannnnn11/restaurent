import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './setting.html',
  styleUrl: './setting.css'
})
export class Setting implements OnInit {

  adminName = 'JodeTx Worker';
  adminEmail = 'admin@jodetx.com';

  orderNotifications = true;
  lowStockAlerts = true;

  darkMode = false;

  private settingsKey = 'jodetx-settings';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  const savedTheme = localStorage.getItem('jodetx-theme');

  this.darkMode = savedTheme === 'dark';

  this.applyTheme();
}

  applyTheme(): void {
  const theme = this.darkMode ? 'dark' : 'light';

  document.body.setAttribute('data-theme', theme);

  localStorage.setItem('jodetx-theme', theme);
}

  saveSettings(): void {

    const settings = {
      adminName: this.adminName,
      adminEmail: this.adminEmail,
      orderNotifications: this.orderNotifications,
      lowStockAlerts: this.lowStockAlerts,
      darkMode: this.darkMode
    };

    localStorage.setItem(
      this.settingsKey,
      JSON.stringify(settings)
    );

    this.applyTheme();

    alert('Settings saved successfully.');
  }

  loadSettings(): void {

    const savedSettings =
      localStorage.getItem(this.settingsKey);

    if (savedSettings) {

      const settings = JSON.parse(savedSettings);

      this.adminName =
        settings.adminName ?? 'JodeTx Worker';

      this.adminEmail =
        settings.adminEmail ?? 'admin@jodetx.com';

      this.orderNotifications =
        settings.orderNotifications ?? true;

      this.lowStockAlerts =
        settings.lowStockAlerts ?? true;

      this.darkMode =
        settings.darkMode ?? false;

    } else {

      const savedTheme =
        localStorage.getItem('jodetx-theme');

      this.darkMode =
        savedTheme === 'dark';
    }

    this.applyTheme();
  }

  resetSettings(): void {

    this.adminName = 'JodeTx Worker';
    this.adminEmail = 'admin@jodetx.com';

    this.orderNotifications = true;
    this.lowStockAlerts = true;

    this.darkMode = false;

    localStorage.removeItem(this.settingsKey);
    localStorage.removeItem('jodetx-theme');

    this.applyTheme();

  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/admin-login']);

  }
}