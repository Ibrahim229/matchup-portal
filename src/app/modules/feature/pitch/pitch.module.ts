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
import {
  AgendaService,
  DayService,
  MonthAgendaService,
  MonthService,
  ScheduleModule,
  TimelineMonthService,
  TimelineViewsService,
  WeekService,
  WorkWeekService,
} from '@syncfusion/ej2-angular-schedule';
import { CalendarModule, DateTimePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { PitchOpenTimeModalComponent } from './components/pitch-open-time-modal/pitch-open-time-modal.component';
import { DatePipe } from '@angular/common';
import { AddEditEventModalComponent } from './components/add-edit-event-modal/add-edit-event-modal.component';

@NgModule({
  declarations: [
    PitchListingComponent,
    AddEditPitchComponent,
    PitchDetailsComponent,
    PitchSchedulerComponent,
    PitchOpenTimeModalComponent,
    AddEditEventModalComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FullCalendarModule,
    PitchRoutingModule,
    GoogleMapsModule,
    ScheduleModule,
    DateTimePickerModule,
    TimePickerModule,
    CalendarModule,
    HttpClientModule,
  ],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    TimelineViewsService,
    TimelineMonthService,
    DatePipe
  ],
})
export class PitchModule {}
