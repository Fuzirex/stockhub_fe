import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginResponseDTO} from "../../classes/response/login-response-dto";
import {LoginRequestDTO} from "../../classes/request/login-request-dto";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient) {
  }

  generateToken(cnpj: string, password: string): Observable<LoginResponseDTO> {
    const url = environment.stockhubApi.baseUrl + environment.stockhubApi.paths.login;
    let loginRequestDTO = new LoginRequestDTO(cnpj, password);
    return this.httpClient.post<LoginResponseDTO>(url, loginRequestDTO);
  }

}
