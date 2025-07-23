import { Routes } from '@angular/router';
import { Dashboard } from './component/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: Dashboard,
    data: { animation: 'DashboardPage' }
  },

  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES),
    data: { animation: 'WelcomePage' }
  },

  {
    path: 'challenge',
    loadChildren: () =>
      import('./pages/challenge/challenge.routes').then(m => m.CHALLENGE_ROUTES),
    data: { animation: 'ChallengePage' }
  },

  {
    path: 'challenge-details/:id',
    loadChildren: () =>
      import('./pages/challenge-details/challenge-details.routes')
        .then(m => m.CHALLENGE_DETAILS_ROUTES),
    data: { animation: 'ChallengeDetailsPage' }
  },

  {
    path: 'challenge-create',
    loadChildren: () =>
      import('./pages/challenge-form/challenge-form.routes')
        .then(m => m.CHALLENGE_FORM_ROUTES),
    data: { animation: 'ChallengeFormPage' }
  },

  {
    path: 'challenge-create/:id',
    loadChildren: () =>
      import('./pages/challenge-form/challenge-form.routes')
        .then(m => m.CHALLENGE_FORM_ROUTES),
    data: { animation: 'ChallengeFormPage' }
  },
];
