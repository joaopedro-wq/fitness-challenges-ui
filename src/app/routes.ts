import { Routes } from '@angular/router';
import { Dashboard } from './component/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES)},
  {path: 'challenge', loadChildren: () => import('./pages/challenge/challenge.routes').then(m => m.CHALLENGE_ROUTES)},
  {path: 'challenge-details/:id', loadChildren: () => import('./pages/challenge-details/challenge-details.routes').then(m => m.CHALLENGE_ROUTES)}

];
