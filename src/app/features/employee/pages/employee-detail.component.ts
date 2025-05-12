import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Employee } from '../../Model/employee.model';
import { EmployeeService } from '../../../services/employee.service';


@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent {
  employee!: Employee | undefined;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.employee = this.employeeService.getEmployeeById(id!);
  }
}
