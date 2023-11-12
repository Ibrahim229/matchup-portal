import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from '../../core/components/content-layout/content-layout.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { HomeGuard } from '../../core/guards/home.guard';
import { AccountLayoutComponent } from './components/account-layout/account-layout.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { PortalAnalyticsComponent } from './pages/portal-analytics/portal-analytics.component';
import { PortalReportsComponent } from './pages/portal-reports/portal-reports.component';
import { UsersListingComponent } from './pages/users-listing/users-listing.component';

const routes: Routes = [
  {
    path: '',
    component: AccountLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
        canActivate: [HomeGuard],
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'account',
    component: ContentLayoutComponent,
    children: [
      {
        title: 'Users',
        path: '',
        component: UsersListingComponent,
        canActivate: [AuthGuard],
      },
      {
        title: 'Change Password',
        path: 'change-password',
        component: ForgotPasswordComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'portal',
    component: ContentLayoutComponent,
    children: [
      {
        title: 'Analytics',
        path: 'analytics',
        component: PortalAnalyticsComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full',
      },
      {
        title: 'Reports',
        path: 'reports',
        component: PortalReportsComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
