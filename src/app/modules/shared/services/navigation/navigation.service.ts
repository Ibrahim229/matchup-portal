import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  navigate(route: any[]) {
    this.router.navigate(route);
  }

  getCurrentRoute(): string {
    return this.router.url;
  }
}
