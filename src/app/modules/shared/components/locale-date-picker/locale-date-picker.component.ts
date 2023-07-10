import {
  Component,
  Inject,
  Input,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import 'moment/locale/ar';
import { Subscriptions } from '../../utils/subscriptions';
import { RangeDatePicker } from '../../_models/form-input-model';
import { merge, of } from 'rxjs';

@Component({
  selector: 'locale-date-picker',
  templateUrl: './locale-date-picker.component.html',
  styleUrls: ['./locale-date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LocaleDatePickerComponent,
      multi: true,
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
})
export class LocaleDatePickerComponent implements OnInit {
  @Input() label!: string;
  @Input() FormControl!: FormControl | RangeDatePicker;
  @Input() isArabicDatePicker = false;
  subs = new Subscriptions();
  @Output() valueChanges = new EventEmitter();

  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {}

  ngOnInit(): void {
    if (this.isArabicDatePicker) {
      this.arabic();
    }
    this.subs.add = merge(
      this.formControl?.valueChanges || of(),
      this.datePicker?.start?.valueChanges || of(),
      this.datePicker?.end?.valueChanges || of()
    )?.subscribe((value) =>
      this.valueChanges.emit({
        selectedValue: value,
        startValue: this.datePicker?.start?.value,
        endValue: this.datePicker?.end?.value,
      })
    );
  }

  writeValue(): void {}
  registerOnChange(): void {}
  registerOnTouched(): void {}

  arabic() {
    this._locale = 'ar';
    this._adapter.setLocale(this._locale);
  }

  get datePicker() {
    return this.FormControl as RangeDatePicker;
  }

  get isRangeDatePicker() {
    return (this.FormControl as RangeDatePicker).start ? true : false;
  }

  get formControl() {
    return this.FormControl as FormControl;
  }
}
