import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomHttpResponse } from '@models/common';
import { Employee } from '@models/employee';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  allEmployees() {
    return this.http.get<CustomHttpResponse<Array<Employee>>>(environment.EMPLOYEES)
  }

  public addEmployee(employee: Employee) {
    return this.http.post<CustomHttpResponse<Employee>>(environment.EMPLOYEES, employee)
  }

  public getEmployee(employeeUuid: string) {
    return this.http.get<CustomHttpResponse<Employee>>(environment.EMPLOYEES + employeeUuid)
  }

  public updateEmployee(employee: Employee, employeeUuid: string) {
    return this.http.put<CustomHttpResponse<Employee>>(environment.EMPLOYEES + employeeUuid, employee)
  }

  public deleteEmployee(employeeUuid: string) {
    return this.http.delete<CustomHttpResponse<string>>(environment.EMPLOYEES + employeeUuid)
  }

}
