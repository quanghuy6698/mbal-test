import { Routes } from '@angular/router';
import { RegisterPage } from './page/register/register.page';
import { ErrorPage } from './page/error/error.page';

export const appRoute: Routes = [
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'error',
    component: ErrorPage,
  },
  {
    path: '**',
    redirectTo: '/error',
  },
];
