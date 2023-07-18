import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { RoleType } from '../enums/role.enum';

@Injectable()
export class HomeGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if the user is authenticated here (e.g., by checking if the token exists in local storage)
    const isAuthenticated = localStorage.getItem('token') !== null;
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );

    if (isAuthenticated) {
      currentUser.role === RoleType.Super_Admin
        ? this.router.navigate(['/account/'])
        : this.router.navigate(['/pitches/']);
      return true; // Allow access to the requested route
    } else {
      this.router.navigate(['/login']); // Redirect to the login page
      return false; // Deny access to the requested route
    }
  }
}
