import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'jodetx-admin-auth';

  private adminUsername = 'worker';
  private adminPassword = 'worker123';

  login(username: string, password: string): boolean {

    if (
      username === this.adminUsername &&
      password === this.adminPassword
    ) {

      localStorage.setItem(
        this.storageKey,
        'true'
      );

      return true;
    }

    return false;
  }

  isLoggedIn(): boolean {

    return localStorage.getItem(
      this.storageKey
    ) === 'true';

  }

  logout(): void {

    localStorage.removeItem(
      this.storageKey
    );

  }
}