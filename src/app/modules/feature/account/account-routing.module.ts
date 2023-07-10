import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from '../../core/components/content-layout/content-layout.component';
import { AccountLayoutComponent } from './components/account-layout/account-layout.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersListingComponent } from './pages/users-listing/users-listing.component';

const routes: Routes = [
  {
    path: '',
    component: AccountLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login',
        title: 'MatchUp',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
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
      },
      {
        title: 'Change Password',
        path: 'change-password',
        component: ForgotPasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
