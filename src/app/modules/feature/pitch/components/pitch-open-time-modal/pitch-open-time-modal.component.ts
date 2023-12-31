import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  TimePickerComponent,
  ChangeEventArgs,
} from '@syncfusion/ej2-angular-calendars';
import { PitchService } from '../../services/pitch/pitch.service';
import { ToastrService } from 'src/app/modules/shared/services/toastr/toastr.service';
import { ToastrTypes } from 'src/app/modules/shared/enums/toastrTypes';

@Component({
  selector: 'pitch-open-time-modal',
  templateUrl: './pitch-open-time-modal.component.html',
  styleUrls: ['./pitch-open-time-modal.component.scss'],
})
export class PitchOpenTimeModalComponent {
  @ViewChild('startTime')
  public startObject: TimePickerComponent;
  @ViewChild('endTime')
  public endObject: TimePickerComponent;
  public isStartTimeChange: Boolean = true;
  public endInput: HTMLInputElement;
  isUpdateTimeSubmitting = false;
  pitchDetails;

  workhours = this.fb.group({
    openT: [null, Validators.required],
    closeT: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PitchOpenTimeModalComponent>,
    private pitchService: PitchService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastrService
  ) {
    this.pitchDetails = data.pitchDetails;
    const isWorkingHoursExist = {
      openT: this.pitchDetails?.openTime,
      closeT: this.pitchDetails?.closeTime,
    };
    this.workhours.patchValue(isWorkingHoursExist);
    this.workhours.updateValueAndValidity();
  }

  onUpdateTime() {
    const payload = {
      openT: new Date(this.workhours.value.openT),
      closeT: new Date(this.workhours.value.closeT),
    };

    this.isUpdateTimeSubmitting = true;
    this.pitchService
      .updateWorkingHours(this.pitchDetails._id, payload)
      .subscribe((res) => {
        if (res.pitchDetails) {
          this.toastrService.showToastr(res.message, ToastrTypes.success);
          this.isUpdateTimeSubmitting = true;
          this.dialogRef.close(true);
        }
        this.isUpdateTimeSubmitting = false;
      });
  }
  onDismiss() {
    this.dialogRef.close(true);
  }

  FormControl(key: string) {
    return this.workhours?.get(key) as FormControl;
  }
}
