import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionEventArgs,
  EventRenderedArgs,
  EventSettingsModel,
  FieldModel,
  RecurrenceEditor,
  RenderCellEventArgs,
  ScheduleComponent,
  TimeScaleModel,
  View,
  WorkHoursModel,
} from '@syncfusion/ej2-angular-schedule';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Lang } from 'src/app/modules/core/enums/lang.enum';
import { TranslationService } from 'src/app/modules/core/services/translation/translation.service';
import { ToastrTypes } from 'src/app/modules/shared/enums/toastrTypes';
import { ToastrService } from 'src/app/modules/shared/services/toastr/toastr.service';
import { Subscriptions } from 'src/app/modules/shared/utils/subscriptions';
import { environment } from 'src/environments/environment';

enum BeginRequestType {
  Create = 'eventCreate',
  Change = 'eventChange',
  Remove = 'eventRemove',
}

enum CompleteRequestType {
  Created = 'eventCreated',
  Changed = 'eventChanged',
  Removed = 'eventRemoved',
}

@Component({
  selector: 'pitch-scheduler',
  templateUrl: './pitch-scheduler.component.html',
  styleUrls: ['./pitch-scheduler.component.scss'],
})
export class PitchSchedulerComponent implements OnDestroy {
  @ViewChild('scheduler')
  public scheduler: ScheduleComponent;

  private recurrenceEditor = new RecurrenceEditor();
  private dataManager: DataManager = new DataManager({
    url: environment.backendUrl + 'admin/event/scheduler',
    crudUrl: environment.backendUrl + 'admin/event/scheduler/actions',
    adaptor: new UrlAdaptor(),
    headers: [
      {
        Authorization: localStorage.getItem('token')
          ? 'Bearer ' + localStorage.getItem('token')?.replace(/^"(.*)"$/, '$1')
          : '',
      },
    ],
  });
  private dataQuery = new Query().from('Batch');
  private pitchId: string;
  private subs = new Subscriptions();

  public Lang = Lang;
  public currentLang!: string;
  public views: View[] = ['Day', 'Week', 'Month'];
  public currentView: View = 'Day';
  public workHours: WorkHoursModel = { start: '08:00', end: '24:00' };
  public timeScale: TimeScaleModel = {
    enable: true,
    interval: 60,
    slotCount: 1,
  };
  public selectedDate = new Date();
  public eventSettings: EventSettingsModel = {
    dataSource: this.dataManager,
    query: this.dataQuery,
    fields: {
      id: 'id',
      subject: { name: 'title' },
      startTime: { name: 'startTime' },
      endTime: { name: 'endTime' },
      isAllDay: { name: 'isAllDay' },
      description: { name: 'description' },
      recurrenceRule: { name: 'recurrenceRule' },
      recurrenceException: { name: 'recurrenceException' },
    },
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private translationService: TranslationService,
    private toasterService: ToastrService
  ) {
    this.processResponse();
    this.getPitchId();
    this.getCurrentLanguage();
  }

  private getPitchId() {
    this.subs.add = this.activatedRoute.params.subscribe(({ id }: { id: string }) => {
      this.dataQuery.addParams('pitchId', id);
      this.pitchId = id;
    });
  }

  private getCurrentLanguage() {
    this.subs.add = this.translationService.currentLanguage$.subscribe((language) => {
      this.currentLang = language;
    });
  }

  private processResponse() {
    this.dataManager.adaptor.processResponse = (data: (FieldModel & { fromMobile: string; _id: string })[]) => {
      return !Array.isArray(data)
        ? data
        : data.map((event) => ({
            ...event,
            id: event._id,
            categoryColor: event.fromMobile ? '#ffcb14' : '#079247',
            phoneNumber: event['user'].phoneNumber,
            fullName: event['user'].fullName,
          }));
    };
  }

  private success(message: string) {
    this.toasterService.showToastr(message, ToastrTypes.success);
  }

  private failure(message: string) {
    this.toasterService.showToastr(message, ToastrTypes.error);
  }

  public onRenderCell(args: RenderCellEventArgs): void {
    if (args.date < new Date()) {
      args.element.classList.add('e-disable-dates');
    }
  }

  private prepareRequest(recurrenceRule: string, startTime: Date, endTime: Date, args: ActionEventArgs) {
    let dateArray = [];

    if (!this.scheduler.isSlotAvailable(startTime, endTime)) {
      this.failure('SLOT NOT AVAILABLE');
      args.cancel = true;
    }

    if (!isNullOrUndefined(recurrenceRule)) {
      dateArray = [];
      let dates: number[] = this.recurrenceEditor.getRecurrenceDates(startTime, recurrenceRule, null, 30);

      for (let i: number = 0; i < dates.length; i++) {
        dateArray.push(new Date(dates[i]).toString());
      }
    }

    this.dataQuery.params = [
      { key: 'pitchId', value: this.pitchId },
      { key: 'requestType', value: args.requestType },
      { key: 'repeatedEvents', value: dateArray as unknown as string },
    ];
  }

  public onActionBegin(args: ActionEventArgs) {
    const requestType = args.requestType as BeginRequestType;

    if (requestType === BeginRequestType.Create) {
      const recurrenceRule = args.addedRecords[0]?.['recurrenceRule'];
      const startTime: Date = args.addedRecords[0]['startTime'];
      const endTime: Date = args.addedRecords[0]['endTime'];

      this.prepareRequest(recurrenceRule, startTime, endTime, args);
    }

    if (requestType === BeginRequestType.Change) {
      const recurrenceRule = args.changedRecords[0]?.['recurrenceRule'];
      const startTime: Date = args.changedRecords[0]['startTime'];
      const endTime: Date = args.changedRecords[0]['endTime'];

      this.prepareRequest(recurrenceRule, startTime, endTime, args);
    }

    if (requestType === BeginRequestType.Remove) {
      this.dataQuery.params = [
        { key: 'pitchId', value: this.pitchId },
        { key: 'requestType', value: BeginRequestType.Remove },
      ];
    }
  }

  public onActionComplete(args: ActionEventArgs) {
    switch (args.requestType as CompleteRequestType) {
      case CompleteRequestType.Created:
        this.success('Event created successfully.');
        break;

      case CompleteRequestType.Changed:
        this.success('Event updated successfully.');
        break;

      case CompleteRequestType.Removed:
        this.success('Event cencelled successfully.');
        break;
    }
  }

  public onActionFailure(event) {
    const errorMessage = JSON.parse(event.error[0].error.response).message;
    this.failure(errorMessage);
  }

  public onEventRendered(args: EventRenderedArgs): void {
    const categoryColor: string = args.data['categoryColor'] as string;
    if (!args.element || !categoryColor) {
      return;
    }

    args.element.style.backgroundColor = categoryColor;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
