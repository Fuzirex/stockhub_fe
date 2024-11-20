import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DealerResponseDTO} from "../../classes/response/dealer-response-dto";

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor(private httpClient: HttpClient) {
  }

  getDealer(cnpj: string): Observable<DealerResponseDTO> {
    const url = environment.stockhubApi.baseUrl + environment.stockhubApi.paths.getDealer.replace('{cnpj}', cnpj);
    return this.httpClient.get<DealerResponseDTO>(url);
  }

  getDealersToTransfer(): Observable<DealerResponseDTO[]> {
    const url = environment.stockhubApi.baseUrl + environment.stockhubApi.paths.getDealersToTransfer;
    return this.httpClient.get<DealerResponseDTO[]>(url);
  }

}
