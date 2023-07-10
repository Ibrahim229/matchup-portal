import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthLogicService } from 'src/app/modules/core/services/auth-logic/auth-logic.service';
import { InputTypes } from 'src/app/modules/shared/enums/form-input-types.enum';
import { NavigationService } from 'src/app/modules/shared/services/navigation/navigation.service';
import { LoginPayload } from '../../models/login-payload.model';
import { RoleType } from 'src/app/modules/core/enums/role.enum';
import { LoginResponse } from 'src/app/modules/core/_models/login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authLogicService: AuthLogicService,
    private navigationService: NavigationService
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  formControl(key: string) {
    return this.loginForm?.get(key) as FormControl;
  }

  onLogin(form: FormGroup) {
    this.authLogicService.login(form.value).subscribe((res: LoginResponse) => {
      if (res.userData.role === RoleType.Super_Admin) {
        this.navigationService.navigate(['/account']);
      } else {
        this.navigationService.navigate(['/account/change-password']);
      }
    });
  }

  get InputTypes() {
    return InputTypes;
  }
}
