import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InputTypes } from 'src/app/modules/shared/enums/form-input-types.enum';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'register-user-modal',
  templateUrl: './register-user-modal.component.html',
  styleUrls: ['./register-user-modal.component.scss'],
})
export class RegisterUserModalComponent {
  InputTypes = InputTypes;
  userName = new FormControl('', Validators.required);
  isNewUserRegistered = false;
  isNewUserSubmitting = false;
  registeredUserDetails: {
    username: string;
    password: string;
  };

  constructor(
    public dialogRef: MatDialogRef<RegisterUserModalComponent>,
    private accountService: AccountService
  ) {}

  onRegisterUser() {
    this.isNewUserSubmitting = true;
    this.accountService.generateUser(this.userName.value).subscribe((res) => {
      if (res.username) {
        this.registeredUserDetails = res;
        this.isNewUserRegistered = true;
      } else {
        this.isNewUserRegistered = false;
      }
      this.isNewUserSubmitting = false;
    });
  }

  onDismiss() {
    this.dialogRef.close(true);
  }
}
