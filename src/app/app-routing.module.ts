import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './modules/core/components/content-layout/content-layout.component';
import { AuthGuard } from './modules/core/guards/auth.guard';
import { RolesGuard } from './modules/core/guards/roles.guard';
import { RoleType } from './modules/core/enums/role.enum';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/feature/account/account.module').then(
        (m) => m.AccountModule
      ),
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'pitches',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/feature/pitch/pitch.module').then(
            (m) => m.PitchModule
          ),
        canLoad: [RolesGuard],
        data: {
          pre: [RoleType.Super_Admin, RoleType.Admin],
        },
      },
      // {
      //   path: 'contracts',
      //   canActivate: [AuthGuard],
      //   loadChildren: () =>
      //     import('./modules/feature/contracts/contracts.module').then(
      //       (m) => m.ContractsModule
      //     ),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
