import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {StockResponseDTO} from "../../classes/response/stock-response-dto";
import {StockRequestDTO} from "../../classes/request/stock-request-dto";
import {PageSpring} from "../../classes/common/page-spring";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: HttpClient) {
  }

  getStockByFilter(filter: StockRequestDTO): Observable<PageSpring> {
    const url = environment.stockhubApi.baseUrl + environment.stockhubApi.paths.getStock;
    return this.httpClient.post<PageSpring>(url, filter);
  }

}
