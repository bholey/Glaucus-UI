import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(login) {
    let params = new HttpParams();
    params = params.set('email', login.email);
    params = params.set('password', login.password);
    return this.http.post(`${environment.app_url}/user/login`, login, {params});
  }

}
