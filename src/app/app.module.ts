import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import ptBr from '@angular/common/locales/pt';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {InitService} from "./services/init/init.service";
import {ContextService} from "./services/context/context.service";
import {NgxSpinnerModule} from "ngx-spinner";
import {FooterComponent} from './components/footer/footer.component';
import {MatTableModule} from "@angular/material/table";
import {HeaderComponent} from './components/header/header.component';
import {StockComponent} from './components/stock/stock.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SubItemComponent} from "./components/navbar/sub-item/sub-item.component";
import {DialogGenericComponent} from "./components/dialogs/dialog-generic/dialog-generic.component";
import {DialogConfirmComponent} from "./components/dialogs/dialog-confirm/dialog-confirm.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";
import {SecurityService} from "./services/security/security.service";
import {DealerService} from "./services/dealer/dealer.service";
import {HttpRequestInterceptor} from "./services/interceptor/http-request-interceptor";
import {StockService} from "./services/stock/stock.service";
import {StockFilterComponent} from "./components/stock/stock-filter/stock-filter.component";
import {StockTableComponent} from "./components/stock/stock-table/stock-table.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {ProductTypeService} from "./services/product-type/product-type.service";
import {InvoiceHistoryComponent} from './components/invoice-history/invoice-history.component';
import {
  InvoiceHistoryFilterComponent
} from './components/invoice-history/invoice-history-filter/invoice-history-filter.component';
import {
  InvoiceHistoryTableComponent
} from './components/invoice-history/invoice-history-table/invoice-history-table.component';
import {UtilsService} from "./services/utils/utils.service";
import {InvoiceService} from "./services/invoice/invoice.service";
import {InvoiceEntryComponent} from './components/invoice-entry/invoice-entry.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {LocationService} from "./services/location/location.service";
import {CurrencyMaskModule} from "ng2-currency-mask";
import { InvoiceEntryProductTableComponent } from './components/invoice-entry/invoice-entry-product-table/invoice-entry-product-table.component';
import {MatSortModule} from "@angular/material/sort";
import {DatePipe, registerLocaleData} from "@angular/common";
import {ReportService} from "./services/report/report.service";

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    StockComponent,
    NavbarComponent,
    SubItemComponent,
    DialogGenericComponent,
    DialogConfirmComponent,
    StockComponent,
    StockFilterComponent,
    StockTableComponent,
    InvoiceHistoryComponent,
    InvoiceHistoryFilterComponent,
    InvoiceHistoryTableComponent,
    InvoiceEntryComponent,
    InvoiceEntryProductTableComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CurrencyMaskModule,
    MatSortModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initFunction,
      deps: [InitService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline', floatLabel: 'auto'}
    },
    provideNgxMask(),
    DatePipe,
    HttpRequestInterceptor,
    InitService,
    ContextService,
    SecurityService,
    DealerService,
    StockService,
    ProductTypeService,
    UtilsService,
    InvoiceService,
    LocationService,
    ReportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initFunction(initService: InitService) {
  return (): Promise<any> => {
    return initService.init();
  };
}
