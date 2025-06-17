import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SuccessionPlan } from '../../../employee/models/succession-plan.model';
import { SuccessionPlanService } from '../../../../services/succession-plan.service';
import { ExportService } from '../../../../services/export.service';

@Component({
  selector: 'app-successors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './successors.component.html',
  styleUrls: ['./successors.component.scss']
})
export class SuccessorsComponent implements OnInit {
  plans: SuccessionPlan[] = [];
  filteredPlans: SuccessionPlan[] = [];
  selectedPotential: string = '';
  selectedReadiness: string = '';
  showCriticalTalentOnly: boolean = false;
  searchTerm: string = '';

  potentialLevels = [
    'High Potential',
    'Potential to Watch',
    'Lateral Potential',
    'At Potential'
  ];

  readinessLevels = [
    'Ready Now',
    'Ready in 1-2 Years',
    'Ready in 3-5 Years',
    'Not Ready'
  ];

  constructor(
    private successionPlanService: SuccessionPlanService,
    private router: Router,
    private exportService: ExportService
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
      // Search filter
      const searchLower = this.searchTerm.toLowerCase();
      const matchesSearch = !this.searchTerm || 
        plan.employeeName.toLowerCase().includes(searchLower) ||
        plan.position.toLowerCase().includes(searchLower) ||
        plan.operations.toLowerCase().includes(searchLower);

      // Potential filter
      const matchesPotential = !this.selectedPotential || 
        plan.potential === this.selectedPotential;

      // Readiness filter
      const matchesReadiness = !this.selectedReadiness || 
        plan.readinessLevel === this.selectedReadiness;

      // Critical talent filter
      const matchesCritical = !this.showCriticalTalentOnly || 
        plan.criticalTalent;

      return matchesSearch && matchesPotential && matchesReadiness && matchesCritical;
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
    this.router.navigate(['/succession-plans', plan.id, 'edit']);
  }

  deletePlan(plan: SuccessionPlan) {
    if (confirm('Are you sure you want to delete this succession plan?')) {
      this.successionPlanService.deletePlan(plan.id);
      this.loadPlans();
    }
  }

  addNewPlan() {
    this.router.navigate(['/succession-plans/new']);
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedPotential = '';
    this.selectedReadiness = '';
    this.showCriticalTalentOnly = false;
    this.applyFilters();
  }

  exportToCSV() {
    this.exportService.exportToCSV(this.filteredPlans);
  }

  exportToWord() {
    this.exportService.exportToWord(this.filteredPlans);
  }

  exportToPDF() {
    this.exportService.exportToPDF(this.filteredPlans);
  }

  exportToExcel() {
    this.exportService.exportToExcel(this.filteredPlans);
  }
}
