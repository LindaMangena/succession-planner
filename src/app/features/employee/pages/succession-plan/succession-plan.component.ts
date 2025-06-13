import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SuccessionPlanService } from '../../services/succession-plan.service';
import { SuccessionPlan } from '../../models/succession-plan.model';
import { EmployeeService } from '../../../../services/employee.service';
import { Employee } from '../../../Model/employee.model';

@Component({
  selector: 'app-succession-plan',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold text-[#c20d00] mb-6">Succession Planning Dashboard</h1>

      <!-- Filters -->
      <div class="mb-6 flex gap-4">
        <select [(ngModel)]="selectedPotential" (change)="applyFilters()" class="border rounded p-2">
          <option value="">All Potential Levels</option>
          <option value="High Potential">High Potential</option>
          <option value="Potential to Watch">Potential to Watch</option>
          <option value="Lateral Potential">Lateral Potential</option>
          <option value="At Potential">At Potential</option>
        </select>

        <select [(ngModel)]="selectedReadiness" (change)="applyFilters()" class="border rounded p-2">
          <option value="">All Readiness Levels</option>
          <option value="Ready Now">Ready Now</option>
          <option value="Ready in 1-2 Years">Ready in 1-2 Years</option>
          <option value="Ready in 3-5 Years">Ready in 3-5 Years</option>
          <option value="Not Ready">Not Ready</option>
        </select>

        <button (click)="showCriticalTalentOnly = !showCriticalTalentOnly; applyFilters()" 
                [class.bg-green-600]="showCriticalTalentOnly"
                class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
          {{ showCriticalTalentOnly ? 'Show All' : 'Show Critical Talent Only' }}
        </button>
      </div>

      <!-- Plans Table -->
      <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Potential</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Readiness</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Critical Talent</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr *ngFor="let plan of filteredPlans" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">{{ plan.employeeName }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ plan.position }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span [class]="getPotentialClass(plan.potential)">{{ plan.potential }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span [class]="getReadinessClass(plan.readinessLevel)">{{ plan.readinessLevel }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span *ngIf="plan.criticalTalent" class="text-red-600">★</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button (click)="viewDetails(plan)" class="text-blue-600 hover:text-blue-800 mr-2">View</button>
                <button (click)="editPlan(plan)" class="text-green-600 hover:text-green-800 mr-2">Edit</button>
                <button (click)="deletePlan(plan)" class="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add New Plan Button -->
      <button (click)="addNewPlan()" 
              class="mt-6 bg-[#23512f] text-white px-4 py-2 rounded hover:bg-green-700">
        Add New Succession Plan
      </button>
    </div>
  `
})
export class SuccessionPlanComponent implements OnInit {
  plans: SuccessionPlan[] = [];
  filteredPlans: SuccessionPlan[] = [];
  selectedPotential: string = '';
  selectedReadiness: string = '';
  showCriticalTalentOnly: boolean = false;

  constructor(
    private successionPlanService: SuccessionPlanService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.loadPlans();
  }

  loadPlans() {
    this.successionPlanService.getPlans().subscribe(plans => {
      this.plans = plans;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredPlans = this.plans.filter(plan => {
      const matchesPotential = !this.selectedPotential || plan.potential === this.selectedPotential;
      const matchesReadiness = !this.selectedReadiness || plan.readinessLevel === this.selectedReadiness;
      const matchesCritical = !this.showCriticalTalentOnly || plan.criticalTalent;
      return matchesPotential && matchesReadiness && matchesCritical;
    });
  }

  getPotentialClass(potential: string): string {
    const classes = {
      'High Potential': 'text-green-600 font-semibold',
      'Potential to Watch': 'text-blue-600',
      'Lateral Potential': 'text-yellow-600',
      'At Potential': 'text-gray-600'
    };
    return classes[potential as keyof typeof classes] || '';
  }

  getReadinessClass(readiness: string): string {
    const classes = {
      'Ready Now': 'text-green-600 font-semibold',
      'Ready in 1-2 Years': 'text-blue-600',
      'Ready in 3-5 Years': 'text-yellow-600',
      'Not Ready': 'text-red-600'
    };
    return classes[readiness as keyof typeof classes] || '';
  }

  viewDetails(plan: SuccessionPlan) {
    // Implement view details logic
  }

  editPlan(plan: SuccessionPlan) {
    // Implement edit plan logic
  }

  deletePlan(plan: SuccessionPlan) {
    if (confirm('Are you sure you want to delete this succession plan?')) {
      this.successionPlanService.deletePlan(plan.id);
      this.loadPlans();
    }
  }

  addNewPlan() {
    // Implement add new plan logic
  }
} 