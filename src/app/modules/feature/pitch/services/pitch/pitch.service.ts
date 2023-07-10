import { Injectable } from '@angular/core';
import { XhrService } from '../../../../core/services/xhr/xhr.service';
import { Method } from '../../../../core/enums/method.enum';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PitchService {
  constructor(private xhrService: XhrService, private http: HttpClient) {}

  getPitches() {
    return this.xhrService.call({
      url: `admin/adminPitch`,
      method: Method.get,
      body: {},
    });
  }

  createPitch(payload: any) {
    return this.xhrService.call(
      {
        url: 'pitch',
        method: Method.post,
        body: payload,
      },
      true
    );
  }

  editPitch(pitchId: string,payload: any) {
    return this.xhrService.call(
      {
        url: `pitch/${pitchId}`,
        method: Method.put,
        body: payload,
      },
      true
    );
  }

  deletePitch(pitchId: string) {
    return this.xhrService.call({
      url: `pitch/${pitchId}`,
      method: Method.delete,
      body: {},
    });
  }
}
