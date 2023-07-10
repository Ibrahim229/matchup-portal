import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthLogicService } from '../services/auth-logic/auth-logic.service';
import { ToastrService } from '../../shared/services/toastr/toastr.service';
import { ToastrTypes } from '../../shared/enums/toastrTypes';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authLogicService: AuthLogicService,
    private toastrService: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = this.authLogicService.currentUserValue;
    if (currentUser) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url

    this.router.navigate(['/login']);
    this.toastrService.dismiss();
    this.toastrService.showToastr(
      'You are Unauthorized to view this page, Please login',
      ToastrTypes.warning
    );
    return false;
  }
}
