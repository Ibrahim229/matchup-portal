import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading = new Subject<boolean>()
  isLoading$ = this.isLoading.asObservable()
  showLoading = false;


  constructor() { }

  show() {
    this.showLoading = true;
    this.isLoading.next(true)
  }

  hide() {
    this.isLoading.next(false)
    this.showLoading = false;
  }

}
