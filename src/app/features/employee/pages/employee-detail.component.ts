import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { RouterModule } from '@angular/router';
import { Employee } from '../../Model/employee.model';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent {
  employee!: Employee | undefined;

  private mockData: Employee[] = [
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
    }
  ];

  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    this.employee = this.mockData.find(emp => emp.personnelNumber === id || emp.name === id);
  }
}
