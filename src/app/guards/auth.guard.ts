import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if admin is logged in
  if (authService.isLoggedIn()) {

    // Allow access
    return true;

  }

  // Not logged in
  // Send user to login page
  return router.createUrlTree(['/admin/login']);

};