import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {DatePipe} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import {ContextService} from "../context/context.service";
import {Observable} from "rxjs";
import {ReportStockRequestDTO} from "../../classes/request/report-stock-request-dto";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  blobResponseTypeOptions = {responseType: 'blob' as 'json'};

  constructor(private httpClient: HttpClient,
              private spinner: NgxSpinnerService,
              private datePipe: DatePipe,
              private translateService: TranslateService,
              private contextService: ContextService) {
  }

  exportStockReport(dto: ReportStockRequestDTO) {
    let reportName: string = 'reports.stock';
    let url = environment.stockhubApi.baseUrl + environment.stockhubApi.paths.exportStockReport;
    this.download(this.httpClient.post<Blob>(url, dto, this.blobResponseTypeOptions), reportName);
  }

  download(dataObservable: Observable<Blob>, reportName: string) {
    let dateNow = this.datePipe.transform(new Date(), 'yyyy-MM-dd_HH-mm-ss');

    dataObservable.subscribe({
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const anchor = document.createElement('a');
        document.body.appendChild(anchor);
        anchor.download = this.translateService.instant(reportName) + "_" + dateNow + ".xlsx";
        anchor.style.display = 'none';
        anchor.href = url;
        anchor.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error: any) => this.contextService.openGenericDialog('warning', 'exceptions.report-export-error', error),
      complete: () => this.spinner.hide()
    });
  }
}
