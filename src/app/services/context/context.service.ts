import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogGenericComponent} from "../../components/dialogs/dialog-generic/dialog-generic.component";
import {DialogConfirmComponent} from "../../components/dialogs/dialog-confirm/dialog-confirm.component";
import {Router} from "@angular/router";
import {DealerResponseDTO} from "../../classes/response/dealer-response-dto";
import {OperationType} from "../../classes/type/operation-type";

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor(private translateService: TranslateService,
              private dialogService: MatDialog,
              private spinner: NgxSpinnerService,
              private router: Router) {
  }

  validateLoggedUser() {
    if (!this.getToken()) {
      this.clearUserAuthentication();
      this.router.navigateByUrl('login');
    }
  }

  closeAllDialogs() {
    this.dialogService.closeAll();
  }

  openGenericDialog(title: string, msg: string, error?: any): MatDialogRef<DialogGenericComponent> | undefined {
    if (!this.isUnauthorizedAccessDialogOpened() && (!error || error.status != 400)) {
      return this.dialogService.open(DialogGenericComponent, {
        data: {
          title: title,
          message: msg
        },
      });
    } else return undefined;
  }

  openConfirmationModal(title: string, msg: string): MatDialogRef<DialogConfirmComponent> | undefined {
    if (!this.isUnauthorizedAccessDialogOpened()) {
      return this.dialogService.open(DialogConfirmComponent, {
        data: {
          title: title,
          message: msg
        },
      });
    } else return undefined;
  }

  openUnauthorizedAccessDialog(): void {
    if (!this.isUnauthorizedAccessDialogOpened()) {
      this.setUnauthorizedAccessDialogOpened(true);

      this.dialogService.open(DialogGenericComponent, {
        data: {
          title: 'warning',
          message: 'unauthorized-access'
        }
      })?.afterClosed().subscribe(exitParams => {
        this.setUnauthorizedAccessDialogOpened(false);
        this.clearUserAuthentication();
        this.router.navigateByUrl('login');
      });
    }
  }

  configureLanguage(language: string) {
    let languageCode: string = (['pt', 'en', 'es'].includes(language)) ? language : 'en';

    this.translateService.use(languageCode);
    this.translateService.setDefaultLang(languageCode);
    this.setLanguage(languageCode);
  }

  setLanguage(language: string): void {
    sessionStorage.setItem('language', language);
  }

  getLanguage(): string {
    return sessionStorage.getItem('language')!;
  }

  setUnauthorizedAccessDialogOpened(flag: boolean): void {
    sessionStorage.setItem('unauthorizedAccessDialogOpened', String(flag));
  }

  isUnauthorizedAccessDialogOpened(): boolean {
    return sessionStorage.getItem('unauthorizedAccessDialogOpened') === 'true';
  }

  getToken(): string {
    let token = sessionStorage.getItem('token');
    return token ? token : '';
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  clearUserAuthentication() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('dealer');
  }

  getDealer(): DealerResponseDTO {
    return JSON.parse(sessionStorage.getItem('dealer')!);
  }

  setDealer(dealer: DealerResponseDTO) {
    sessionStorage.setItem('dealer', JSON.stringify(dealer));
  }

  setOperationType(operation: OperationType) {
    sessionStorage.setItem('operationType', operation.toString());
  }

  getOperationType(): OperationType {
    let operation = sessionStorage.getItem('operationType');

    if (operation !== null)
      return OperationType[operation as keyof typeof OperationType] !== undefined
        ? OperationType[operation as keyof typeof OperationType]
        : OperationType.SALE;
    else
      return OperationType.SALE;
  }

}
