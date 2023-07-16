import { Injectable } from '@angular/core';
import { XhrService } from '../../../../core/services/xhr/xhr.service';
import { Method } from '../../../../core/enums/method.enum';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecommenrdationService {
  constructor(private xhrService: XhrService, private http: HttpClient) {}

  getRecommendationsListing() {
    return this.xhrService.call({
      url: `superAdmin/pitch`,
      method: Method.get,
      body: {},
    });
  }

  getRecommendations() {
    return this.xhrService.call({
      url: `pitch/recommended`,
      method: Method.get,
      body: {},
    });
  }

  addRecommendation(pitchId: string) {
    return this.xhrService.call({
      url: `pitch/recommended/${pitchId}`,
      method: Method.get,
      body: {},
    });
  }

  deleteRecommendation(pitchId: string) {
    return this.xhrService.call({
      url: `pitch/recommended/${pitchId}`,
      method: Method.delete,
      body: {},
    });
  }
}
