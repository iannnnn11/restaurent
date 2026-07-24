import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Dashboard } from './components/dashboard/dashboard';
import { Menu } from './components/menu/menu';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'signup',
    component: Signup
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'menu',
    component: Menu
  }
];