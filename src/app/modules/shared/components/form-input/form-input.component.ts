import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import 'moment/locale/ar';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  RadioOption,
  RangeDatePicker,
  SelectOptions,
} from '../../_models/form-input-model';
import { InputTypes } from '../../enums/form-input-types.enum';
import { Subscriptions } from '../../utils/subscriptions';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormInputComponent,
      multi: true,
    },
  ],
})
export class FormInputComponent implements OnInit {
  hide = true;
  @Input() label!: string;
  @Input() type: InputTypes = InputTypes.TEXT;
  @Input() placeholder?: string;
  @Input() max: number;
  @Input() FormControl!: FormControl | RangeDatePicker;
  @Input() selectOptions?: SelectOptions;
  @Input() radioOptions?: RadioOption[];
  @Input() iconClass?: boolean = false;
  @Input() isReadonly = false;
  @Output() selectedOption = new EventEmitter();
  @Output() valueChanges = new EventEmitter();
  @ContentChild('selectOption') selectOption!: TemplateRef<Element> | null;
  @ViewChild(MatInput) matInput!: MatInput;
  @ViewChild(MatSelect) matSelect!: MatSelect;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originalList: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filteredList$ = new BehaviorSubject<any[]>([]);
  dropDownSearchFormControl = new FormControl('');
  isOptional!: boolean;
  subs = new Subscriptions();
  @Input() isArabicDatePicker = false;

  ngOnInit(): void {
    if (this.type === InputTypes.TEXT_AREA) {
      this.formControl?.addValidators([Validators.maxLength(400)]);
    }
    this.setInitialFilteredListValue();
    this.filterListChangeEvent();

    // this.subs.add = merge(
    //   this.formControl?.valueChanges || of(),
    //   this.datePicker?.start?.valueChanges || of(),
    //   this.datePicker?.end?.valueChanges || of()
    // )?.subscribe((value) => this.valueChanges.emit(value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectOptions'] && !changes['selectOptions'].firstChange) {
      this.setInitialFilteredListValue();
    }
  }

  writeValue(): void {}
  registerOnChange(): void {}
  registerOnTouched(): void {}

  _selectedOption(event: unknown, value?: unknown) {
    this.dropDownSearchFormControl.setValue('');
    this.selectedOption.emit({ event, value });
  }

  get formControl() {
    return this.FormControl as FormControl;
  }

  get isError() {
    return (
      this.formControl && this.formControl.errors && this.formControl.touched
    );
  }

  get selectOptionsList$() {
    if (Array.isArray(this.selectOptions?.list)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return of(this.selectOptions?.list as any[]);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.selectOptions?.list as Observable<any[]>;
  }

  @Input()
  get optional() {
    return this.isOptional;
  }

  set optional(value: boolean | string) {
    this.isOptional = value !== null && `${value}` !== 'false';
  }

  get InputTypes() {
    return InputTypes;
  }

  get selectOptionsList() {
    return this.originalList.filter((item) =>
      this.formControl.value.includes(item[this.selectOptions?.key ?? 'key'])
    );
  }

  get isRangeDatePicker() {
    return (this.FormControl as RangeDatePicker)?.start !== undefined;
  }

  get datePicker() {
    return this.FormControl as RangeDatePicker;
  }

  onRemoveSelected(key: string) {
    this.formControl.setValue(
      this.formControl.value.filter((itemKey: string) => itemKey !== key)
    );
  }

  private setInitialFilteredListValue() {
    this.subs.add = this.selectOptionsList$?.subscribe((list) => {
      this.originalList = list;
      this.filteredList$.next(list);
    });
  }

  private filterListChangeEvent() {
    this.subs.add = this.dropDownSearchFormControl.valueChanges.subscribe(
      (searchValue) => {
        if (!this.filteredList$.value) {
          return;
        }

        if (!searchValue) {
          this.filteredList$.next([...this.originalList]);
          return;
        } else {
          searchValue = searchValue.toLowerCase();
        }

        this.filteredList$.next(
          this.originalList.filter(
            (item) =>
              item[this.selectOptions?.value ?? 'value']
                .toLowerCase()
                .indexOf(searchValue) > -1
          )
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
