import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PitchListingComponent } from './pages/pitch-listing/pitch-listing.component';
import { RoleType } from '../../core/enums/role.enum';
import { RolesGuard } from '../../core/guards/roles.guard';
import { AddEditPitchComponent } from './pages/add-edit-pitch/add-edit-pitch.component';
import { PitchDetailsComponent } from './pages/pitch-details/pitch-details.component';
import { PitchSchedulerComponent } from './pages/pitch-scheduler/pitch-scheduler.component';

const routes: Routes = [
  {
    title: 'Pitches',
    path: '',
    children: [
      {
        title: 'Pitches Listing',
        path: '',
        component: PitchListingComponent,
        data: {
          pre: [RoleType.Admin],
        },
        canActivate: [RolesGuard],
      },
      {
        title: 'Add Pitch',
        path: 'add-pitch',
        component: AddEditPitchComponent,
        data: {
          pre: [RoleType.Admin],
        },
        canActivate: [RolesGuard],
      },
      {
        title: 'Edit Pitch',
        path: 'edit-pitch/:id',
        component: AddEditPitchComponent,
        data: {
          pre: [RoleType.Admin],
        },
        canActivate: [RolesGuard],
      },
      {
        title: 'Pitch Details',
        path: 'details/:id',
        component: PitchDetailsComponent,
        data: {
          pre: [RoleType.Admin],
        },
        canActivate: [RolesGuard],
      },
      {
        title: 'Pitch Scheduler',
        path: 'scheduler/:id',
        component: PitchSchedulerComponent,
        data: {
          pre: [RoleType.Admin],
        },
        canActivate: [RolesGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PitchRoutingModule {}
