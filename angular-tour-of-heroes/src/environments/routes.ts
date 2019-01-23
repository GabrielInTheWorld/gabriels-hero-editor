// Internal imports
import { Route } from '../app/route';

import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { HeroesComponent } from 'src/app/heroes/heroes.component';
import { HeroDetailComponent } from 'src/app/hero-detail/hero-detail.component';
import { SettingsComponent } from 'src/app/settings/settings.component';

/**
 * A constant which define the routes.
 */
export const routes: Route[] = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    title: 'Dashboard',
    link: '/dashboard',
    path: 'dashboard',
    icon: 'dashboard',
    component: DashboardComponent
  },
  {
    title: 'See all Heroes',
    link: '/heroes',
    path: 'heroes',
    icon: 'people',
    component: HeroesComponent
  },
  {
    title: 'Create a new Hero',
    link: '/detail/-1',
    path: 'detail/:id',
    icon: 'face',
    component: HeroDetailComponent
  },
  {
    title: 'Preferences',
    link: '/settings',
    path: 'settings',
    icon: 'settings',
    component: SettingsComponent
  }
];
