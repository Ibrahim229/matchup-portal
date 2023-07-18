import {
  Component,
  ChangeDetectorRef,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  EventRenderedArgs,
  EventSettingsModel,
  ScheduleComponent,
  View,
  FieldModel,
  WorkHoursModel,
  TimeScaleModel,
  RenderCellEventArgs,
  PopupOpenEventArgs,
  ActionEventArgs,
  CellClickEventArgs,
  CurrentAction,
  EJ2Instance,
} from '@syncfusion/ej2-angular-schedule';
import { Subscriptions } from 'src/app/modules/shared/utils/subscriptions';
import { ActivatedRoute } from '@angular/router';
import { PitchService } from '../../services/pitch/pitch.service';
import { ToastrService } from 'src/app/modules/shared/services/toastr/toastr.service';
import { ToastrTypes } from 'src/app/modules/shared/enums/toastrTypes';
import { DatePipe } from '@angular/common';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-calendars';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { L10n } from '@syncfusion/ej2-base';
import { Lang } from 'src/app/modules/core/enums/lang.enum';
import { TranslationService } from 'src/app/modules/core/services/translation/translation.service';

L10n.load({
  'en-US': {
    schedule: {
      saveButton: 'Submit',
      cancelButton: 'Close',
      deleteButton: 'Cancel',
      newEvent: 'Add Event',
    },
  },
});

@Component({
  selector: 'pitch-scheduler',
  templateUrl: './pitch-scheduler.component.html',
  styleUrls: ['./pitch-scheduler.component.scss'],
})
export class PitchSchedulerComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('scheduler') scheduler: ScheduleComponent;
  @ViewChild('customEditorTemplate') customEditorTemplate: TemplateRef<any>;

  subs = new Subscriptions();
  pitchId: string;
  pitchDetails: any;
  isLoadingData = false;
  public workHours: WorkHoursModel = { start: '08:00', end: '24:00' };
  public startHour;
  public endHour;
  public _startDate: Date;
  public _endDate: Date;
  editMode = false;
  public views: View[] = ['Day', 'Week', 'Month'];
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  public currentView: View = 'Day';
  public data = [];
  public readonly: boolean;
  public eventSettings: EventSettingsModel;
  Lang = Lang;
  currentLang!: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private pitchService: PitchService,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.subs.add = this.translationService.currentLanguage$.subscribe(
      (language) => {
        this.currentLang = language;
      }
    );
    this.subs.add = this.activatedRoute.params.subscribe((params) => {
      this.pitchId = params['id'];
      this.getPitchDetails();
      this.eventSettings = {
        dataSource: this.data,
        fields: {
          id: 'id',
          subject: { name: 'eventName' },
          startTime: { name: 'startTime' },
          endTime: { name: 'endTime' },
          categoryColor: { name: 'categoryColor' }, // Use lowercase 'categoryColor'
          fromMobile: { name: 'fromMobile' },
          phoneNumber: { name: 'phoneNumber' },
          fullName: { name: 'fullName' },
          canCancel: { name: 'canCancel' },
        } as FieldModel,
      };
    });
    // this.scheduler.popupOpen = this.onPopupOpen.bind(this);
  }

  ngAfterViewInit(): void {
    // Customize time slots in the Scheduler after the view has been initialized
    const currentTime = new Date();

    const timeScale: TimeScaleModel = {
      enable: true,
      interval: 60,
      slotCount: 1,
    };
    const workHours: WorkHoursModel = {
      start: currentTime.toString(),
    };
    if (this.scheduler) {
      this.scheduler.workHours = workHours;
      this.scheduler.timeScale = timeScale;
      this.scheduler.refresh();
    }

    // this.scheduler.renderCell = this.onRenderCell.bind(this);
  }

  onRenderCell(args: RenderCellEventArgs): void {
    // Adding "e-disable-date" class to preventing the CRUD actions in the past date and time cells
    if (args.date < new Date()) {
      args.element.classList.add('e-disable-dates');
    }
  }

  public onEventRendered(args: EventRenderedArgs): void {
    const categoryColor: string = args.data['categoryColor'] as string;
    if (!args.element || !categoryColor) {
      return;
    }

    args.element.style.backgroundColor = categoryColor;
  }

  onActionBegin(args: ActionEventArgs): void {
    // if (args.requestType === 'eventCreate') {
    //   if (args?.addedRecords?.length) {
    //     const payload = {
    //       title: args?.addedRecords[0]['eventName'],
    //       startT: args?.addedRecords[0]['startTime'],
    //       endT: args?.addedRecords[0]['endTime'],
    //     };
    //     this.pitchService
    //       .createEvent(this.pitchId, payload)
    //       .subscribe((res) => {
    //         if (res.error) {
    //           args.cancel = true; // Cancel the event addition
    //           this.toastrService.showToastr(res.error, ToastrTypes.success);
    //         } else {
    //           this.toastrService.showToastr(res.message, ToastrTypes.success);
    //         }
    //       });
    //   }
    // }
    if (args.requestType === 'eventCreate') {
      let eventData: any = args.data[0];

      if (
        !this.scheduler.isSlotAvailable(
          eventData?.StartTime ? eventData?.StartTime : eventData?.startTime,
          eventData?.EndTime ? eventData?.EndTime : eventData?.endTime
        )
      ) {
        // Here the isSlotAvailable public method used to check for the availability of the mentioned time slot
        this.toastrService.showToastr('SLOT NOT AVAILABLE', ToastrTypes.error);
        args.cancel = true;
      } else {
        if (args?.addedRecords?.length) {
          const payload = {
            title: args?.addedRecords[0]['Subject']
              ? args?.addedRecords[0]['Subject']
              : args?.addedRecords[0]['eventName'],
            startT: args?.addedRecords[0]['StartTime']
              ? args?.addedRecords[0]['StartTime']
              : args?.addedRecords[0]['startTime'],
            endT: args?.addedRecords[0]['EndTime']
              ? args?.addedRecords[0]['EndTime']
              : args?.addedRecords[0]['endTime'],
          };
          this.pitchService
            .createEvent(this.pitchId, payload)
            .subscribe((res) => {
              if (res.error) {
                args.cancel = true; // Cancel the event addition
                this.toastrService.showToastr(res.error, ToastrTypes.success);
              } else {
                this.getPitchDetails();
                args.cancel = false;
                this.toastrService.showToastr(res.message, ToastrTypes.success);
              }
            });
        } else {
          args.cancel = false;
        }
        this.scheduler.refresh();
      }
    } else if (args.requestType === 'dateNavigate') {
      this.editMode = true;
    } else if (args.requestType === 'eventRemove') {
      if (!args?.deletedRecords[0]['canCancel']) {
        args.cancel = true;
        this.toastrService.showToastr('CANNOT CANCEL', ToastrTypes.error);
      } else {
        this.pitchService
          .cancelEvent(args?.deletedRecords[0]['id'])
          .subscribe((res) => {
            if (res.error) {
              this.toastrService.showToastr(res.error, ToastrTypes.success);
              args.cancel = true; // Cancel the event addition
            } else {
              this.getPitchDetails();
              args.cancel = false;
              this.toastrService.showToastr(res.message, ToastrTypes.success);
            }
          });
      }
    }
  }

  public onActionComplete(args: any): void {
    if (
      args.requestType === 'eventCreate' ||
      args.requestType === 'eventChange'
    ) {
      const data: Record<string, any> =
        args.data instanceof Array ? args.data[0] : args.data;

      args.cancel = true;
    }
  }

  public onPopupClose(event) {
    this.editMode = false;
    this._startDate = null;
    this._endDate = null;
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.data['id']) {
      this.editMode = true;
    } else {
      this.editMode = false;
    }

    // Preventing the open event popup for past dates or disabled time cells
    if (
      args.type === 'Editor' &&
      args.data &&
      args.data['startTime'] < new Date()
    ) {
      args.cancel = true;
      const moreDetailsButton: HTMLElement =
        args.element.querySelector('.e-more-details');
      if (moreDetailsButton) {
        moreDetailsButton.classList.add('hide-more-details');
      }
    }

    if (
      !this.scheduler.isSlotAvailable(
        args.data['startTime'],
        args.data['endTime']
      )
    ) {
      // Here the isSlotAvailable public method used to check for the availability of the mentioned time slot
      this.toastrService.showToastr('SLOT NOT AVAILABLE', ToastrTypes.error);
      args.cancel = true;
    }

    // Preventing the double-click action on past dates or disabled time cells
    // if (
    //   args.type === 'QuickInfo' &&
    //   args.data &&
    //   args.data['startTime'] < new Date()
    // ) {
    //   args.cancel = true;
    // }
  }

  public startDateParser(data: string) {
    if (isNullOrUndefined(this._startDate) && !isNullOrUndefined(data)) {
      return new Date(data);
    } else if (!isNullOrUndefined(this._startDate)) {
      return new Date(this._startDate);
    }
  }
  public endDateParser(data: string) {
    if (isNullOrUndefined(this._endDate) && !isNullOrUndefined(data)) {
      return new Date(data);
    } else if (!isNullOrUndefined(this._endDate)) {
      return new Date(this._endDate);
    }
  }

  public onDateChange(args: ChangeEventArgs): void {
    if (!isNullOrUndefined(args.event)) {
      if (args.element.id === 'startTime') {
        this._startDate = args.value;
      } else if (args.element.id === 'endTime') {
        this._endDate = args.value;
      }
    }
  }

  getPitchDetails() {
    this.isLoadingData = true;
    this.pitchService.getPitches().subscribe((res: any) => {
      const pitches = res;
      this.pitchDetails = pitches.find((pitch) => pitch._id === this.pitchId);
      this.pitchService.getPitchEvents(this.pitchId).subscribe((res) => {
        let modifiedRes = [];
        res.map((event) => {
          const modifiedEvent = {
            id: event._id,
            eventName: event.title,
            startTime: new Date(event.startTime),
            endTime: new Date(event.endTime),
            categoryColor: event.fromMobile ? '#ffcb14' : '#079247',
            fromMobile: event.fromMobile,
            phoneNumber: event.user.phoneNumber,
            fullName: event.user.fullName,
            canCancel: event.canCancel,
          };
          modifiedRes.push(modifiedEvent);
        });
        this.data = modifiedRes;

        this.startHour = this.datePipe.transform(
          this.pitchDetails.openTime,
          'HH:mm'
        );

        this.adjustEndTime;
        const endTime = this.datePipe.transform(
          this.pitchDetails.closeTime,
          'HH:mm'
        );

        if (
          new Date(this.pitchDetails.openTime).getHours() >
          new Date(this.pitchDetails.closeTime).getHours()
        ) {
          this.endHour = this.adjustEndTime(
            new Date(`${new Date().toDateString()} ${endTime}`)
          )
            .toTimeString()
            .slice(0, 5);
        } else {
          if (endTime === '23:00') {
            this.endHour = '24:00';
          } else {
            this.endHour = endTime;
          }
        }
        this.workHours = {
          start: this.startHour,
          end: this.endHour,
        };
        console.log(this.startHour, this.endHour);
        console.log(this.workHours);
        this.eventSettings = {
          ...this.eventSettings,
          dataSource: this.data,
        };
        this.isLoadingData = false;
      });
    });
  }

  // this.scheduleObj?.closeQuickInfoPopup();
  

  private adjustEndTime(endTime: Date): Date {
    const adjustedEndTime = new Date(endTime);
    adjustedEndTime.setDate(adjustedEndTime.getDate() + 1);
    return adjustedEndTime;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
