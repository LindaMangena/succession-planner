import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private router: Router) {
    this.employeeId = this.route.snapshot.paramMap.get('id');

    const employees: Employee[] = JSON.parse(localStorage.getItem('employees') || '[]');
    this.employee = employees.find(emp => emp.personnelNumber === this.employeeId);
  }

  submitPlan() {
    if (!this.successorName || !this.readinessLevel || !this.targetDate) {
      alert('Please fill in all required fields.');
      return;
    }

    const plan = {
      employeeId: this.employeeId,
      forEmployee: this.employee?.name || '',
      successorName: this.successorName,
      readinessLevel: this.readinessLevel,
      developmentPlan: this.developmentPlan,
      targetDate: this.targetDate,
      createdAt: new Date().toISOString(),
    };

    const existingPlans = JSON.parse(localStorage.getItem('successionPlans') || '[]');
    existingPlans.push(plan);
    localStorage.setItem('successionPlans', JSON.stringify(existingPlans));

    alert('✅ Succession plan saved successfully!');
    this.router.navigate(['/employees', this.employeeId]);
  }
}
