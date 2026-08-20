import { Routes } from '@angular/router';

import { Login as UserLogin } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Dashboard } from './components/dashboard/dashboard';
import { Menu } from './components/menu/menu';
import { Orders } from './components/orders/orders';
import { CartComponent } from './components/cart/cart';
import { Categories } from './components/categories/categories';
import { Booktable } from './components/booktable/booktable';
import { Profile } from './components/profile/profile';
import { Settings } from './components/settings/settings';
import { ProfileDetails } from './components/profile-details/profile-details';
import { Activity } from './components/activity/activity';
import { Security } from './components/security/security';

import { Dash } from './shyam/dash/dash';
import { Login as AdminLogin } from './shyam/login/login';
import { Home } from './shyam/home/home';
import { Order } from './shyam/order/order';
import { Inventory } from './shyam/inventory/inventory';
import { Employeee } from './shyam/employeee/employeee';
import { Revenue } from './shyam/revenue/revenue';
import { Setting } from './shyam/setting/setting';

import { authGuard } from './auth-guard';

export const routes: Routes = [

  {
    path: 'login',
    component: UserLogin
  },

  {
    path: 'signup',
    component: Signup
  },

  {
    path: 'admin-login',
    component: AdminLogin
  },

  {
    path: 'dashboard',
    component: Dashboard
  },

  {
    path: 'menu',
    component: Menu
  },

  {
    path: 'orders',
    component: Orders
  },

  {
    path: 'cart',
    component: CartComponent
  },

  {
    path: 'categories',
    component: Categories
  },

  {
    path: 'booktable',
    component: Booktable
  },

  {
    path: 'settings',
    component: Settings
  },

  {
    path: 'profile',
    component: Profile,
    children: [
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full'
      },
      {
        path: 'details',
        component: ProfileDetails
      },
      {
        path: 'activity',
        component: Activity
      },
      {
        path: 'security',
        component: Security
      },
      {
        path: 'settings',
        component: Settings
      }
    ]
  },

  {
    path: 'dash',
    component: Dash,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: Home
      },
      {
        path: 'order',
        component: Order
      },
      {
        path: 'employeee',
        component: Employeee
      },
      {
        path: 'inventory',
        component: Inventory
      },
      {
        path: 'revenue',
        component: Revenue
      },
      {
        path: 'setting',
        component: Setting
      }
    ]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];