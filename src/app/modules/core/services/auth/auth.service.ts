import { Injectable } from '@angular/core';
import { Method } from '../../enums/method.enum';
import { XhrService } from '../xhr/xhr.service';
import { map } from 'rxjs/operators';
import { LoginPayload } from '../../../feature/account/models/login-payload.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private xhrService: XhrService) {}

  login(payload: LoginPayload) {
    return this.xhrService.call({
      url: 'admin/login',
      method: Method.post,
      body: payload,
    });
  }

  getRoles() {
    return this.xhrService
      .call({
        url: 'api/Role/GetRoles',
        method: Method.get,
        body: {},
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
