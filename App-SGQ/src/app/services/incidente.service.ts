import { IncidenteModel } from './../../models/incidente-model';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IncidenteService {
  private getOptions(myParams?: HttpParams) {
    const httpClientDefaultHeader: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const myOptions = { headers: httpClientDefaultHeader, params: myParams };
    return myOptions;
  }

  constructor(private httpClient: HttpClient) {}

  getIncidentes(): Observable<IncidenteModel> {
    const url = environment.serverHost + '/api/incidents';
    const params = '';

    const result: any = this.httpClient.get(url, this.getOptions());
    return result;
  }

  getIncidente(idIncidente: number): Observable<IncidenteModel> {
    const url = environment.serverHost + '/api/incident/' + idIncidente;

    const result: any = this.httpClient.get(url, this.getOptions());
    return result;
  }

  getIncidentInsumosNcs(idIncidente: number): Observable<IncidenteModel> {
    const url = environment.serverHost + '/api/incidentInsumosNcs/' + idIncidente;

    const result: any = this.httpClient.get(url, this.getOptions());
    return result;
  }

  createIncidente(incidente: IncidenteModel): Observable<IncidenteModel> {
    const url = environment.serverHost + '/api/incident';
    const params = JSON.stringify(incidente);

    const result: any = this.httpClient.post(url, params, this.getOptions());
    return result;
  }

  updateIncidente(
    id: number,
    incidente: IncidenteModel
  ): Observable<IncidenteModel> {
    const url = environment.serverHost + '/api/incident/' + id;
    const params = JSON.stringify(incidente);

    const result: any = this.httpClient.put(url, params, this.getOptions());
    return result;
  }

  deleteIncidente(id: number): Observable<IncidenteModel> {
    const url = environment.serverHost + '/api/incident/' + id;
    const params = '';

    const result: any = this.httpClient.delete(url, this.getOptions());
    return result;
  }
}
