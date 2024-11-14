import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {ContextService} from "../context/context.service";
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService,
              private contextService: ContextService) {
  }

  handleError(error: any) {
    if (error.status === 401 || error.status === 403) {
      if (!this.contextService.isUnauthorizedAccessDialogOpened()) {
        this.contextService.closeAllDialogs();
        this.contextService.openUnauthorizedAccessDialog();
      }

    } else if (error?.status === 400) {
      this.contextService.closeAllDialogs();
      this.contextService.openGenericDialog('warning', error.error.errorMessage);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newRequest: HttpRequest<any> = request;

    if (newRequest.url.indexOf('http') >= 0) {
      const token = this.contextService.getToken();

      newRequest = request.clone({
        headers: request.headers.set('Accept-Language', this.contextService.getLanguage())
      });

      if (token)
        newRequest = newRequest.clone({
          headers: newRequest.headers.set('Authorization', 'Bearer ' + token)
        });
    }

    return next.handle(newRequest).pipe(catchError((error: HttpErrorResponse) => {
      this.interceptUnauthorized(error);
      return throwError(() => error);
    }));
  }

  interceptUnauthorized(error: HttpErrorResponse) {
    this.stopAllSpinners();
    this.handleError(error);
  }

  private stopAllSpinners() {
    this.spinner.hide();
  }

}
