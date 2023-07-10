import { ToastrTypes } from 'src/app/modules/shared/enums/toastrTypes';
import { ToastrService } from './../../../shared/services/toastr/toastr.service';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEvent,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import { LoaderService } from 'src/app/modules/shared/services/loader/loader.service';
import { NavigationService } from 'src/app/modules/shared/services/navigation/navigation.service';
import { environment } from 'src/environments/environment';
import { Method } from '../../enums/method.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class XhrService {
  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private loaderService: LoaderService,
    private navigationService: NavigationService
  ) {}

  defaultOptions = {
    url: environment.backendUrl,
    method: Method.post,
    params: null,
    headers: new HttpHeaders({}),
    responseType: 'json',
    observe: null,
  };

  public getFinalParams(options: any, isFile: boolean = false): any {
    !isFile
      ? (this.defaultOptions.headers = new HttpHeaders({
          Accept: '/',
          'Content-Type': 'application/json',
          'Accept-Language': localStorage.getItem('defaultLanguage')
            ? (localStorage.getItem('defaultLanguage') as string)
            : 'en',
          LanguageCode: localStorage.getItem('defaultLanguage')
            ? (localStorage.getItem('defaultLanguage') as string)
            : 'en',
          Authorization: localStorage.getItem('token')
            ? 'Bearer ' +
              localStorage.getItem('token')?.replace(/^"(.*)"$/, '$1')
            : '',
        }))
      : (this.defaultOptions.headers = new HttpHeaders({
          Accept: '/',
          'Accept-Language': localStorage.getItem('defaultLanguage')
            ? (localStorage.getItem('defaultLanguage') as string)
            : 'en',
          LanguageCode: localStorage.getItem('defaultLanguage')
            ? (localStorage.getItem('defaultLanguage') as string)
            : 'en',
          Authorization: localStorage.getItem('token')
            ? 'Bearer ' +
              localStorage.getItem('token')?.replace(/^"(.*)"$/, '$1')
            : '',
        }));

    const newRequestOptions: any = (<any>Object).assign(
      {},
      this.defaultOptions,
      options
    );
    let finalRequestOptions: any;
    finalRequestOptions = {};
    finalRequestOptions.method = newRequestOptions.method;
    finalRequestOptions.url = this.constructUrl(newRequestOptions.url);
    finalRequestOptions.body = newRequestOptions.body;
    finalRequestOptions.options = {
      headers: newRequestOptions.headers,
      params: newRequestOptions.params,
      responseType: newRequestOptions.responseType,
      observe: 'response',
      withCredentials: false,
    };
    finalRequestOptions.responseParent = newRequestOptions.responseParent;
    return finalRequestOptions;
  }

  public constructUrl(url: string): string {
    let finalUrl = this.defaultOptions.url + url;
    return finalUrl;
  }

  call(params: any, isFile: boolean = false): Observable<any> {
    if (!params.disableLoader) {
      this.loaderService.show();
    }

    return new Observable((observer) => {
      let finalParams = this.getFinalParams(params, isFile);
      const req = new HttpRequest(
        finalParams.method,
        finalParams.url,
        finalParams.body,
        finalParams.options
      );

      const request = this.http.request(req);
      let rejection: string;
      if (navigator.onLine) {
        request.subscribe(
          (event: HttpEvent<any>) => {
            if (event.type === HttpEventType.Sent) {
              return;
            }
            if (event.type === HttpEventType.Response) {
              const body = event.body;
              observer.next(body);
              if (event.status == 200 || event.status == 201) {
                //  this.toastrService.dismiss();
                // this.toastrService.showToastr(event.statusText, ToastrTypes.success)
              } else if (event.status == 204) {
                this.toastrService.dismiss();
                this.toastrService.showToastr(
                  event.statusText,
                  ToastrTypes.success
                );
              } else {
                this.toastrService.dismiss();
                this.toastrService.showToastr(
                  event.statusText,
                  ToastrTypes.error
                );
              }
              this.loaderService.hide();
            }
          },
          (error: HttpErrorResponse) => {
            this.loaderService.hide();

            if (error.error instanceof ErrorEvent) {
              // A client-side or network error occurred. Handle it accordingly.
              console.error('An error occurred:', error);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong,
              if (error.status === 400) {
                this.toastrService.showToastr(
                  error.error ? error.error : 'An error occurred',
                  ToastrTypes.error
                );
              } else if (error.status === 401) {
                this.toastrService.dismiss();
                this.toastrService.showToastr(
                  'Your session has been expired, Please login',
                  ToastrTypes.warning
                );
                localStorage.clear();
                this.navigationService.navigate(['/login']);
              } else {
                this.toastrService.showToastr(error?.error, ToastrTypes.error);
              }
            }
            observer.error(rejection);
          }
        );
      } else {
        this.loaderService.hide();
        this.toastrService.dismiss();
        this.toastrService.showToastr(
          'Your session has been expired, Please login',
          ToastrTypes.warning
        );
      }
    });
  }
}
