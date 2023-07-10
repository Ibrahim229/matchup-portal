import { Inject, Injectable, Injector } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { RoleType } from '../enums/role.enum';
import { ToastrService } from '../../shared/services/toastr/toastr.service';
import { ToastrTypes } from '../../shared/enums/toastrTypes';
import { isHasRole } from '../../shared/utils/isHasRole';
import { Location } from '@angular/common';

@Injectable()
export class RolesGuard implements CanActivate, CanLoad {
  roles: RoleType[] = [];
  constructor(
    @Inject(Injector) private readonly injector: Injector,
    private router: Router,
    private toastrService: ToastrService,
    private location: Location
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.roles = route.data?.['pre'];
    if (!this.roles?.some((pre) => isHasRole(pre))) {
      {
        this.toastrService.showToastr(
          'You don`t have Premission for viewing this page',
          ToastrTypes.warning
        );
      }

      this.location.back();
      // return this.router.navigate(['']);
    }

    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.roles = route.data?.['pre'];
    if (!this.roles?.some((pre) => isHasRole(pre))) {
      {
        this.toastrService.showToastr(
          'You don`t have Premission for viewing this page',
          ToastrTypes.warning
        );
      }

      // this.location.back();
      return this.router.navigate(['/pitches/']);
    }

    return true;
  }
}
