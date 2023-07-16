import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecommendationsListingComponent } from './pages/recommendations-listing/recommendations-listing.component';
import { RoleType } from '../../core/enums/role.enum';
import { RolesGuard } from '../../core/guards/roles.guard';

const routes: Routes = [
  {
    title: 'Recommendations',
    path: '',
    children: [
      {
        title: 'Recommendations Listing',
        path: '',
        component: RecommendationsListingComponent,
        data: {
          pre: [RoleType.Super_Admin],
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
export class RecommendationRoutingModule {}
