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

  editPitch(pitchId: string, payload: any) {
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

  deletePitchAttachment(pitchId: string, payload) {
    return this.xhrService.call({
      url: `pitch/deletePitchImage/${pitchId}`,
      method: Method.delete,
      body: payload,
    });
  }

  getPitchEvents(pitchId: string) {
    return this.xhrService.call({
      url: `admin/event/${pitchId}`,
      method: Method.get,
      body: {},
    });
  }

  createEvent(pitchId: string, payload: any) {
    return this.xhrService.call({
      url: `admin/event/createEvent/${pitchId}`,
      method: Method.post,
      body: payload,
    });
  }

  updateWorkingHours(pitchId: string, payload: any) {
    return this.xhrService.call({
      url: `pitch/updateCloseTime/${pitchId}`,
      method: Method.put,
      body: payload,
    });
  }

  cancelEvent(eventId: string) {
    return this.xhrService.call({
      url: `admin/event/cancelEvent/${eventId}`,
      method: Method.get,
      body: {},
    });
  }
}
