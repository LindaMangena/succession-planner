import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../Model/employee.model';

@Component({
  selector: 'app-add-succession-plan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-succession-plan.component.html',
  styleUrls: ['./add-succession-plan.component.scss'],
})
export class AddSuccessionPlanComponent {
  employeeId: string | null = null;
  employee: Employee | undefined;

  // Form fields
  successorName = '';
  readinessLevel = '';
  developmentPlan = '';
  targetDate = '';

  // Mock data
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

  constructor(private route: ActivatedRoute) {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.employee = this.employees.find(e => e.personnelNumber === this.employeeId);
  }

  // ✅ THIS METHOD FIXES YOUR ERROR
  submitPlan() {
    if (!this.successorName || !this.readinessLevel || !this.targetDate) {
      alert('Please fill in all required fields.');
      return;
    }

    const plan = {
      forEmployee: this.employee?.name,
      successorName: this.successorName,
      readinessLevel: this.readinessLevel,
      developmentPlan: this.developmentPlan,
      targetDate: this.targetDate,
    };

    console.log('✅ Succession Plan Submitted:', plan);
    alert('Succession plan saved successfully!');
  }
}
