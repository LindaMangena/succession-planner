import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../Model/employee.model';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent {
  searchTerm: string = '';

  constructor(private router: Router) {}

  employees: Employee[] = [
    {
      personnelNumber: '001',
      name: 'John Doe',
      position: 'Store Manager',
      startDate: '2018-01-01',
      operations: 'Operations North',
      manager: 'Jane Smith',
      employmentType: 'Permanent',
      lt: 'Yes',
      exco: 'No',
      performanceRating: 'Exceeds Expectations',
    },
    {
      personnelNumber: '002',
      name: 'Alice Johnson',
      position: 'Shift Supervisor',
      startDate: '2019-06-15',
      operations: 'Operations North',
      manager: 'John Doe',
      employmentType: 'Permanent',
      lt: 'No',
      exco: 'No',
      performanceRating: 'Meets Expectations',
    },
  ];

  getManagers(): string[] {
    return [...new Set(this.employees.map(e => e.manager))];
  }

  getReportsForManager(manager: string): Employee[] {
    return this.employees.filter(e => e.manager === manager);
  }

  getFilteredReports(manager: string): Employee[] {
    return this.getReportsForManager(manager).filter(e =>
      e.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      e.position.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      e.performanceRating.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  goToDetails(id: string) {
    this.router.navigate(['/employees', id]);
  }
}
