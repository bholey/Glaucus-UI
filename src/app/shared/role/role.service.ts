import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EmployeeInterface} from '../../employees/employee.interface';
import {environment} from '../../../environments/environment';
import {RoleInterface} from './role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  fetchRoles() {
    return this.http
      .get<RoleInterface>(`${environment.app_url}/user/role`);
  }
}
