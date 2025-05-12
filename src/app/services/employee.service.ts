import { Injectable } from '@angular/core';
import { Employee } from '../features/Model/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];

  setEmployees(data: Employee[]) {
    this.employees = data;
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.employees.find(emp => emp.personnelNumber === id);
  }
}
