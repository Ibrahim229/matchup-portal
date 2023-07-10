import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() ctrl!: FormControl;
  @Input() shouldShow = false;

  // eslint-disable-next-line @typescript-eslint/ban-types
  private static readonly errorMessages: Record<string, Function> = {
    required: () => 'LABELS.FORM.VALIDATIONS.FIELD_IS_REQUIRED',
    pattern: (params: { requiredPattern: string }) =>
      ErrorMessageComponent.checkPatternMessage(params.requiredPattern),
    email: () => 'LABELS.FORM.VALIDATIONS.REQUIRED_EMAIL',
    notmatched: () => 'LABELS.FORM.VALIDATIONS.MIS_MATCH',
    numbersOnly: () => 'LABELS.FORM.VALIDATIONS.NUMBERS_ONLY',
    tenDigit: () => 'LABELS.FORM.VALIDATIONS.TEN_DIGITS_VALUE',
  };
  constructor() {}

  ngOnInit() {}

  shouldShowErrors(): boolean {
    return !!(
      (this.ctrl && this.ctrl.errors && this.ctrl.touched) ||
      (this.ctrl && this.ctrl.errors && this.shouldShow)
    );
  }

  listOfErrors(): string[] {
    const errors: string[] = [];
    if (this.ctrl.errors) {
      for (const field of Object.keys(this.ctrl.errors)) {
        if (field in ErrorMessageComponent.errorMessages) {
          errors.push(
            ErrorMessageComponent.errorMessages[field](this.ctrl.errors[field])
          );
        }
      }
    }

    return errors;
  }

  static checkPatternMessage(pattern: string) {
    let validationMessage;

    switch (pattern) {
      case '^(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{3,4}[)]?))s*[)]?[-s.]?[(]?[0-9]{1,3}[)]?([-s.]?[0-9]{1,3})([-s.]?[0-9]{3,4})$':
        validationMessage = 'Phone Number is Invalid';
        break;

      case '^(0|[1-9][0-9]*)$':
        validationMessage = 'This field value must be greater than 1';
        break;

      case '^[0-9a-zA-Z\\s]+$':
        validationMessage =
          'This field value must consist of English letters , numbers and  spaces';
        break;
      case '^[\u0621-\u064A0-9\\s]+$':
        validationMessage =
          'This field value must consist of Arabic letters, numbers and  spaces';
        break;
      case '^[a-zA-Z\\s]+$':
        validationMessage =
          'This field value must consist of English letters  and  spaces only ';
        break;
      case '^[\u0621-\u064A\\s]+$':
        validationMessage =
          'This field value must consist of Arabic letters  and  spaces only';
        break;
      case '^[0-9]{10}$':
        validationMessage = 'This field value must be 10 Numbers';
        break;
      case '^[0-9]*$':
        validationMessage = 'This field accept numbers only';
        break;
      default:
        validationMessage = 'The required pattern is: ' + pattern;
        break;
    }
    return validationMessage;
  }
}
