import { InsumoModel } from '../../models/insumo-model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { delay, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InsumoService {
  private getOptions(myParams?: HttpParams) {
    const httpClientDefaultHeader: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const myOptions = { headers: httpClientDefaultHeader, params: myParams };
    return myOptions;
  }

  constructor(private httpClient: HttpClient) {}

  getResults(): Observable<InsumoModel> {
    const url = environment.serverHost + '/api/parts';

    const result: any = this.httpClient.get(url, this.getOptions());
    return result;
  }
}
