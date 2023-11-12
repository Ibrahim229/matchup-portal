import { Injectable } from '@angular/core';

import { Method } from 'src/app/modules/core/enums/method.enum';
import { XhrService } from 'src/app/modules/core/services/xhr/xhr.service';
import { ChangePasswordPayload } from 'src/app/modules/feature/account/models/change-password-payload.model';
import { Filters } from 'src/app/modules/feature/account/models/reports.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private xhrService: XhrService) {}

  getAdminUsers() {
    return this.xhrService.call({
      url: 'admin/getAdminUsers',
      method: Method.get,
      body: {},
    });
  }

  generateUser(username: string) {
    return this.xhrService.call({
      url: `admin/generateUser/${username}`,
      method: Method.get,
      body: {},
    });
  }

  deleteUser(userId: string) {
    return this.xhrService.call({
      url: `admin/deleteUser/${userId}`,
      method: Method.delete,
      body: {},
    });
  }

  changePassword(payload: ChangePasswordPayload) {
    return this.xhrService.call({
      url: 'admin/changePass',
      method: Method.put,
      body: payload,
    });
  }

  getSystemAnalytics() {
    return this.xhrService.call({
      url: 'superAdmin/analytics/getUserAnalytics',
      method: Method.get,
      body: {},
    });
  }

  getSystemReports(body: Filters) {
    return this.xhrService.call({
      url: 'superAdmin/analytics/getUserReports',
      method: Method.post,
      body,
    });
  }
}
