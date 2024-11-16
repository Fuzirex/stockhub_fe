import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ProductTypeResponseDTO} from "../../classes/response/product-type-response-dto";

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private httpClient: HttpClient) {
  }

  getAllProductTypes(): Observable<ProductTypeResponseDTO[]> {
    const url = environment.stockhubApi.baseUrl + environment.stockhubApi.paths.getAllProductType;
    return this.httpClient.get<ProductTypeResponseDTO[]>(url);
  }
}
