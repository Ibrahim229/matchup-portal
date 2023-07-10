import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchingValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password?.value === confirmPassword?.value
    ? null
    : { notmatched: true };
};

export function exceedValueValidator(
  controlName: string,
  compareToControlName: string
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const controlValue = control.get(controlName)?.value;
    const compareToControlValue = control.get(compareToControlName)?.value;

    if (
      controlValue &&
      compareToControlValue &&
      controlValue > compareToControlValue * 0.025
    ) {
      return { compareValuesPercentage: true };
    }

    return null;
  };
}

export function tenDigitValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const isValid = /^[0-9]{10}$/.test(value);
    return isValid ? null : { tenDigit: true };
  };
}

export function numbersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isNumber = /^[0-9]*$/.test(control.value);
    return isNumber ? null : { numbersOnly: true };
  };
}
