import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { ToastrTypes } from '../../enums/toastrTypes';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private _snackBar: MatSnackBar) {}

  toastConfig: MatSnackBarConfig<any> | undefined = {
    duration: 3000,
    verticalPosition: 'bottom',
    horizontalPosition: 'center',
    panelClass: ToastrTypes.error,
  };

  showToastr(message: string, toastrType: string) {
    this._snackBar.open(message, 'X', {
      ...this.toastConfig,
      panelClass: toastrType,
    });
  }

  dismiss() {
    this._snackBar.dismiss();
  }
}
