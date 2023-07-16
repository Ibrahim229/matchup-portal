import { Component, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

type ErrorParams = Record<string, string | number> | number;
interface ErrorMessageReturn {
  text: string;
  variable?: string | number;
}

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  @Input() FormControl: FormControl;
  @Input() isError: boolean;

  get errors() {
    return Object.entries(this.FormControl.errors ?? {}).reduce(
      (errors, [errorKey, errorValue]: [string, ErrorParams]) => {
        errors[errorKey] = this.errorMessages[errorKey]?.(errorValue);
        return errors;
      },
      {} as ValidationErrors
    );
  }

  private errorMessages: Record<
    string,
    (params: ErrorParams) => ErrorMessageReturn
  > = {
    required: () => ({ text: 'INPUT_ERRORS.REQUIRED' }),
    min: (params: { min: number }) => ({
      text: 'INPUT_ERRORS.MIN',
      variable: params.min,
    }),
    max: (params: { max: number }) => ({
      text: 'INPUT_ERRORS.MAX',
      variable: params.max,
    }),
    minLength: (params: { requiredLength: string }) => ({
      text: 'INPUT_ERRORS.MIN_LENGTH',
      variable: params.requiredLength,
    }),
    maxLength: (params: { requiredLength: string }) => ({
      text: 'INPUT_ERRORS.MAX_LENGTH',
      variable: params.requiredLength,
    }),
    email: () => ({ text: 'INPUT_ERRORS.EMAIL' }),
    /*
     * pattern */
    pattern: ({ requiredPattern }: { requiredPattern: string }) =>
      this.patternMessage(requiredPattern),
    date: (params: { message: string }) => ({ text: params.message }),

    notmatched: () => ({ text: 'LABELS.FORM.VALIDATIONS.MIS_MATCH' }),

    numbersOnly: () => ({ text: 'LABELS.FORM.VALIDATIONS.NUMBERS_ONLY' }),
  };

  private patternMessage(pattern: string): ErrorMessageReturn {
    switch (pattern) {
      case '^(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{3,4}[)]?))s*[)]?[-s.]?[(]?[0-9]{1,3}[)]?([-s.]?[0-9]{1,3})([-s.]?[0-9]{3,4})$':
        return { text: 'INPUT_ERRORS.PHONE_NUMBER' };

      case '^[0-9]*$':
        return { text: 'INPUT_ERRORS.DECIMAL_NUMBER' };

      case '^(0|[1-9][0-9]*)$':
        return { text: 'INPUT_ERRORS.GREATER_THAN_ONE' };

      default:
        return { text: `INPUT_ERRORS.DEFAULT_PATTERN`, variable: pattern };
    }
  }
}
