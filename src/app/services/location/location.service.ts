import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {LocationResponseDTO} from "../../classes/response/location-response-dto";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) {
  }

  getCountries(): Observable<LocationResponseDTO[]> {
    const url = environment.stockhubApi.baseUrl + environment.stockhubApi.paths.getCountries;
    return this.httpClient.get<LocationResponseDTO[]>(url);
  }

  getStates(): Observable<LocationResponseDTO[]> {
    const url = environment.stockhubApi.baseUrl + environment.stockhubApi.paths.getStates;
    return this.httpClient.get<LocationResponseDTO[]>(url);
  }

  getCitiesByState(state: number): Observable<LocationResponseDTO[]> {
    const url = environment.stockhubApi.baseUrl + environment.stockhubApi.paths.getCitiesByState.replace('{state}', state.toString());
    return this.httpClient.get<LocationResponseDTO[]>(url);
  }
}
