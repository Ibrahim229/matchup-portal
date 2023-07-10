import {FormControl} from '@angular/forms'
import {Observable} from 'rxjs'

export interface RangeDatePicker {
  start: FormControl
  end: FormControl
}

export interface SelectOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[] | Observable<any[]>
  multiple?: boolean
  key?: string
  value?: string
}

export interface RadioOption {
  key: number | string
  value: string
  checked?: boolean
  disabled?: boolean
}

export type YearDatePickerReturnType = 'FULL_DATE' | 'YEAR'
