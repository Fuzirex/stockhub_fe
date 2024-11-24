import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {ContextService} from "../context/context.service";
import {catchError, Observable, throwError} from "rxjs";
import {DatePipe} from "@angular/common";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService,
              private contextService: ContextService,
              private datePipe: DatePipe) {
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

      if (request.method === 'POST')
        this.changeDatesToLocalDateTime(request.body);
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

  changeDatesToLocalDateTime(body: any) {
    if (body === null || body === undefined)
      return body;

    if (typeof body !== 'object')
      return body;

    for (const key of Object.keys(body)) {
      const value = body[key];

      if (value instanceof Date)
        body[key] = this.datePipe.transform(value, 'yyyy-MM-ddTHH:mm:ss');

      else if (typeof value === 'object')
        this.changeDatesToLocalDateTime(value);
    }
  }

}
