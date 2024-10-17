import { Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {ContentComponent} from "./pages/content/content.component";
import {SettingsProfileComponent} from "./pages/content/settings-profile/settings-profile.component";
import {SettingsSecurityComponent} from "./pages/content/settings-security/settings-security.component";
import {SettingsNotificationsComponent} from "./pages/content/settings-notifications/settings-notifications.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'content',
    component: ContentComponent,
    children: [
      {
        path: 'configProfile',
        component: SettingsProfileComponent
      },
      {
        path: 'security',
        component: SettingsSecurityComponent
      },
      {
        path: 'notifications',
        component: SettingsNotificationsComponent
      }
    ]
  }
];
