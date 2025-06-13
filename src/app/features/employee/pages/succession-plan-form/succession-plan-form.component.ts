import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessionPlanService } from '../../services/succession-plan.service';
import { EmployeeService } from '../../../../services/employee.service';
import { SuccessionPlan } from '../../models/succession-plan.model';
import { Employee } from '../../../Model/employee.model';

@Component({
  selector: 'app-succession-plan-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-[#c20d00]">
            {{ isEditMode ? 'Edit' : 'Create' }} Succession Plan
          </h1>
          <p class="mt-2 text-gray-600">Fill in the details below to create a comprehensive succession plan.</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="space-y-8">
          <!-- Employee Information Card -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-800">Employee Information</h2>
              <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Selected</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-1">
                <p class="text-sm text-gray-500">Name</p>
                <p class="font-medium text-gray-900">{{ plan.employeeName }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-sm text-gray-500">Position</p>
                <p class="font-medium text-gray-900">{{ plan.position }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-sm text-gray-500">Operations</p>
                <p class="font-medium text-gray-900">{{ plan.operations }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-sm text-gray-500">Manager</p>
                <p class="font-medium text-gray-900">{{ plan.manager }}</p>
              </div>
            </div>
          </div>

          <!-- Succession Plan Details -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">Succession Plan Details</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Potential -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Potential</label>
                <select [(ngModel)]="plan.potential" name="potential" required
                        class="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#23512f] focus:border-transparent">
                  <option [ngValue]="undefined">Select potential level...</option>
                  <option value="High Potential">High Potential</option>
                  <option value="Potential to Watch">Potential to Watch</option>
                  <option value="Lateral Potential">Lateral Potential</option>
                  <option value="At Potential">At Potential</option>
                </select>
              </div>

              <!-- Readiness Level -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Readiness Level</label>
                <select [(ngModel)]="plan.readinessLevel" name="readinessLevel" required
                        class="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#23512f] focus:border-transparent">
                  <option [ngValue]="undefined">Select readiness level...</option>
                  <option value="Ready Now">Ready Now</option>
                  <option value="Ready in 1-2 Years">Ready in 1-2 Years</option>
                  <option value="Ready in 3-5 Years">Ready in 3-5 Years</option>
                  <option value="Not Ready">Not Ready</option>
                </select>
              </div>
            </div>

            <!-- Critical Talent -->
            <div class="mt-6">
              <label class="flex items-center space-x-3">
                <input type="checkbox" [(ngModel)]="plan.criticalTalent" name="criticalTalent"
                       class="w-4 h-4 text-[#23512f] border-gray-300 rounded focus:ring-[#23512f]">
                <span class="text-sm font-medium text-gray-700">Mark as Critical Talent</span>
              </label>
            </div>
          </div>

          <!-- Development Details -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">Development Details</h2>
            
            <!-- Development Needs -->
            <div class="space-y-2 mb-6">
              <label class="block text-sm font-medium text-gray-700">Development Needs</label>
              <textarea [(ngModel)]="plan.developmentNeeds" name="developmentNeeds"
                        rows="3" class="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#23512f] focus:border-transparent"
                        placeholder="List key development needs..."></textarea>
            </div>

            <!-- Targeted Interventions -->
            <div class="space-y-2 mb-6">
              <label class="block text-sm font-medium text-gray-700">Targeted Interventions</label>
              <textarea [(ngModel)]="plan.targetedInterventions" name="targetedInterventions"
                        rows="3" class="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#23512f] focus:border-transparent"
                        placeholder="List specific interventions..."></textarea>
            </div>

            <!-- Comments -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Additional Comments</label>
              <textarea [(ngModel)]="plan.comments" name="comments"
                        rows="3" class="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#23512f] focus:border-transparent"
                        placeholder="Add any additional comments..."></textarea>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-4 pt-6">
            <button type="button" (click)="onCancel()"
                    class="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Cancel
            </button>
            <button type="submit"
                    class="px-6 py-2.5 bg-[#23512f] text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#23512f]">
              {{ isEditMode ? 'Update' : 'Create' }} Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class SuccessionPlanFormComponent implements OnInit {
  isEditMode = false;
  plan: Partial<SuccessionPlan> = {
    potential: undefined,
    criticalTalent: false,
    readinessLevel: undefined,
    developmentNeeds: '',
    targetedInterventions: '',
    comments: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private successionPlanService: SuccessionPlanService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const planId = this.route.snapshot.paramMap.get('id');
    if (planId) {
      this.isEditMode = true;
      this.loadPlan(planId);
    } else {
      this.loadStoredUserData();
    }
  }

  private loadStoredUserData() {
    const storedUser = localStorage.getItem('selectedUserForSuccessionPlan');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.plan = {
        ...this.plan,
        employeeId: userData.personnelNumber.toString(),
        employeeName: userData.name,
        position: userData.position,
        operations: userData.operations,
        manager: userData.manager
      };
      // Clear the stored data after loading
      localStorage.removeItem('selectedUserForSuccessionPlan');
    }
  }

  loadPlan(id: string) {
    const plan = this.successionPlanService.getPlanById(id);
    if (plan) {
      this.plan = { ...plan };
    } else {
      // Handle case where plan is not found
      this.router.navigate(['/successors']);
    }
  }

  onSubmit() {
    if (!this.plan.employeeId || !this.plan.employeeName) {
      alert('Employee information is missing');
      return;
    }

    if (!this.plan.potential || !this.plan.readinessLevel) {
      alert('Please fill in all required fields');
      return;
    }

    const planData: Omit<SuccessionPlan, 'id' | 'lastUpdated'> = {
      employeeId: this.plan.employeeId,
      employeeName: this.plan.employeeName,
      position: this.plan.position!,
      operations: this.plan.operations!,
      manager: this.plan.manager!,
      potential: this.plan.potential!,
      criticalTalent: this.plan.criticalTalent || false,
      readinessLevel: this.plan.readinessLevel!,
      developmentNeeds: this.plan.developmentNeeds || '',
      targetedInterventions: this.plan.targetedInterventions || '',
      comments: this.plan.comments || '',
      createdBy: 'Current User' // Replace with actual user
    };

    try {
      if (this.isEditMode) {
        this.successionPlanService.updatePlan(this.plan.id!, planData);
      } else {
        this.successionPlanService.createPlan(planData);
      }
      this.router.navigate(['/successors']);
    } catch (error) {
      alert('An error occurred while saving the plan. Please try again.');
      console.error('Error saving plan:', error);
    }
  }

  onCancel() {
    // Clear any stored user data
    localStorage.removeItem('selectedUserForSuccessionPlan');
    this.router.navigate(['/successors']);
  }
} 