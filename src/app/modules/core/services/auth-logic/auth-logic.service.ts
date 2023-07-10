import { LoginResponse, UserData } from '../../_models/login-response';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { LoginPayload } from 'src/app/modules/feature/account/models/login-payload.model';

@Injectable({
  providedIn: 'root',
})
export class AuthLogicService {
  private currentUserSubject: BehaviorSubject<UserData> | any;
  public currentUser!: Observable<UserData>;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('currentUser') as string)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(payload: LoginPayload) {
    return this.authService.login(payload).pipe(
      map((result: LoginResponse) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(result.userData));
        localStorage.setItem('token', JSON.stringify(result.token));
        this.currentUserSubject.next(result);
        return result;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token') as string).token;
  }

  get currentUserValue(): UserData {
    return this.currentUserSubject.value;
  }

  getRoles() {
    return this.authService.getRoles().pipe(
      map((result: any) => {
        return result;
      })
    );
  }
}
