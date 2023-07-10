import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PitchRoutingModule } from './pitch-routing.module';
import { PitchListingComponent } from './pages/pitch-listing/pitch-listing.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { AddEditPitchComponent } from './pages/add-edit-pitch/add-edit-pitch.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { PitchDetailsComponent } from './pages/pitch-details/pitch-details.component';
import { PitchSchedulerComponent } from './pages/pitch-scheduler/pitch-scheduler.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    PitchListingComponent,
    AddEditPitchComponent,
    PitchDetailsComponent,
    PitchSchedulerComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FullCalendarModule,
    PitchRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
  ],
})
export class PitchModule {}
