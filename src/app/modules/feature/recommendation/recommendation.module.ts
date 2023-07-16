import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecommendationRoutingModule } from './recommendation-routing.module';
import { RecommendationsListingComponent } from './pages/recommendations-listing/recommendations-listing.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AddRecommendationModalComponent } from './components/add-recommendation-modal/add-recommendation-modal.component';


@NgModule({
  declarations: [RecommendationsListingComponent, AddRecommendationModalComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    RecommendationRoutingModule
  ]
})
export class RecommendationModule { }
