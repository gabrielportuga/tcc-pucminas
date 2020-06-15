import { UserModel } from './../../models/user-model';
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
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private getOptions(myParams?: HttpParams) {
    const httpClientDefaultHeader: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const myOptions = { headers: httpClientDefaultHeader, params: myParams };
    return myOptions;
  }

  doRegister(value) {}

  doLogin(value): Observable<any> {
    const url = environment.serverHost + '/api/validateuser';
    const params = JSON.stringify(value);

    return this.httpClient.post(url, params, this.getOptions());
  }

  getUser(): UserModel {
    let user: UserModel;
    user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  doLogout() {
    localStorage.removeItem('user');
  }
}
