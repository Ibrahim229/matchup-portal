import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InputTypes } from 'src/app/modules/shared/enums/form-input-types.enum';
import { AccountService } from '../../services/account/account.service';
import { ChangePasswordPayload } from '../../models/change-password-payload.model';
import { UserData } from 'src/app/modules/core/_models/login-response';
import { ToastrService } from 'src/app/modules/shared/services/toastr/toastr.service';
import { ToastrTypes } from 'src/app/modules/shared/enums/toastrTypes';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  currentUser!: UserData;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private accountService: AccountService,
    private toastrService: ToastrService
  ) {
    this.currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
    this.forgotForm = this.fb.group(
      {
        userName: [this.currentUser?.userName, [Validators.required]],
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmNewPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  onChangePassword(form: FormGroup) {
    const payload: ChangePasswordPayload = {
      currentPass: form.value.currentPassword,
      newPass: form.value.newPassword,
    };
    this.accountService.changePassword(payload).subscribe((res) => {
      // this.handleCancel();
      this.toastrService.showToastr(res, ToastrTypes.success);
    });
  }

  formControl(key: string) {
    return this.forgotForm?.get(key) as FormControl;
  }

  get forgotFormError() {
    if (this.forgotForm?.errors) {
      return this.forgotForm.errors['notmatched'];
    }
  }

  get InputTypes() {
    return InputTypes;
  }

  handleCancel() {
    this.location.back();
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('newPassword').value;
    const confirmPassword = group.get('confirmNewPassword').value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
