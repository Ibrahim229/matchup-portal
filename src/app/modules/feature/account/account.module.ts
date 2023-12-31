import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { AccountLayoutComponent } from './components/account-layout/account-layout.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MaterialModule } from '../../shared/material/material.module';
import { UsersListingComponent } from './pages/users-listing/users-listing.component';
import { RegisterUserModalComponent } from './components/register-user-modal/register-user-modal.component';
import { PortalAnalyticsComponent } from './pages/portal-analytics/portal-analytics.component';
import { PortalReportsComponent } from './pages/portal-reports/portal-reports.component';

@NgModule({
  declarations: [
    LoginComponent,
    AccountLayoutComponent,
    ForgotPasswordComponent,
    UsersListingComponent,
    RegisterUserModalComponent,
    PortalAnalyticsComponent,
    PortalReportsComponent,
  ],
  imports: [CommonModule, AccountRoutingModule, SharedModule, MaterialModule],
})
export class AccountModule {}
