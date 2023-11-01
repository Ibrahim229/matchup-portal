import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TranslateModule } from '@ngx-translate/core';
import {
  CalendarModule,
  DateTimePickerModule,
  TimePickerModule,
} from '@syncfusion/ej2-angular-calendars';
import {
  AgendaService,
  DayService,
  MonthAgendaService,
  MonthService,
  RecurrenceEditorModule,
  ScheduleModule,
  TimelineMonthService,
  TimelineViewsService,
  WeekService,
  WorkWeekService,
} from '@syncfusion/ej2-angular-schedule';
import { SharedModule } from '../../shared/shared.module';
import { AddEditEventModalComponent } from './components/add-edit-event-modal/add-edit-event-modal.component';
import { PitchOpenTimeModalComponent } from './components/pitch-open-time-modal/pitch-open-time-modal.component';
import { AddEditPitchComponent } from './pages/add-edit-pitch/add-edit-pitch.component';
import { PitchDetailsComponent } from './pages/pitch-details/pitch-details.component';
import { PitchListingComponent } from './pages/pitch-listing/pitch-listing.component';
import { PitchSchedulerComponent as PitchSchedulerComponent2 } from './pages/pitch-scheduler-2/pitch-scheduler.component';
import { PitchSchedulerComponent } from './pages/pitch-scheduler/pitch-scheduler.component';
import { PitchRoutingModule } from './pitch-routing.module';

@NgModule({
  declarations: [
    PitchListingComponent,
    AddEditPitchComponent,
    PitchDetailsComponent,
    PitchSchedulerComponent,
    PitchOpenTimeModalComponent,
    AddEditEventModalComponent,
    PitchSchedulerComponent2,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FullCalendarModule,
    PitchRoutingModule,
    GoogleMapsModule,
    ScheduleModule,
    RecurrenceEditorModule,
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
    DatePipe,
  ],
})
export class PitchModule {}
