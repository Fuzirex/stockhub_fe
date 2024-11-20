import { Injectable } from '@angular/core';
import {PageSpring} from "../../classes/common/page-spring";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {InvoiceOperationTypeResponseDTO} from "../../classes/response/invoice-operation-type-response-dto";
import {InvoiceHistoryRequestDTO} from "../../classes/request/invoice-history-request-dto";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private httpClient: HttpClient) {
  }

  getInvoiceHistory(filter: InvoiceHistoryRequestDTO): Observable<PageSpring> {
    const url = environment.stockhubApi.baseUrl + environment.stockhubApi.paths.getInvoiceHistory;
    return this.httpClient.post<PageSpring>(url, filter);
  }

  getInvoiceOperations(): Observable<InvoiceOperationTypeResponseDTO[]> {
    const url = environment.stockhubApi.baseUrl + environment.stockhubApi.paths.getInvoiceOperations;
    return this.httpClient.get<InvoiceOperationTypeResponseDTO[]>(url);
  }
}
