import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {EmployeeInterface} from './employee.interface';
import {NgTemplateOutlet} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  fetchEmployees() {
      const headers = new HttpHeaders({userid: '1'});
      return this.http
        .get<EmployeeInterface>(`${environment.app_url}/employee/`);
  }

  fetchEmployee(id: number) {
    return this.http
      .get<NgTemplateOutlet>(`${environment.app_url}/employee/${id}`);
  }

  updateEmployees(id: number, employeesData: EmployeeInterface) {
    return this.http.put<EmployeeInterface>(`${environment.app_url}/employee/${id}`, employeesData);
  }
  createEmployee(employeeData: EmployeeInterface) {
    console.log('runnnnnnn')
    return this.http.post(`${environment.app_url}/employee/`, employeeData);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${environment.app_url}/employee/${id}`);
  }
}
