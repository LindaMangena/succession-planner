import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SuccessionPlan } from '../features/employee/models/succession-plan.model';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class SuccessionPlanService {
  private plansSubject = new BehaviorSubject<SuccessionPlan[]>([]);

  constructor(private dashboardService: DashboardService) {
    this.loadPlans();
  }

  private loadPlans() {
    const storedPlans = localStorage.getItem('successionPlans');
    if (storedPlans) {
      const plans = JSON.parse(storedPlans);
      console.log('Loading plans:', plans);
      this.plansSubject.next(plans);
      this.dashboardService.updateFromSuccessionPlans(plans);
    } else {
      console.log('No stored plans found');
    }
  }

  getPlans(): Observable<SuccessionPlan[]> {
    return this.plansSubject.asObservable();
  }

  getPlanById(id: string): SuccessionPlan | undefined {
    return this.plansSubject.value.find(p => p.id === id);
  }

  addPlan(plan: Omit<SuccessionPlan, 'id' | 'lastUpdated'>) {
    console.log('Adding new plan:', plan);
    const newPlan: SuccessionPlan = {
      ...plan,
      id: crypto.randomUUID(),
      lastUpdated: new Date()
    };
    const currentPlans = this.plansSubject.value;
    const updatedPlans = [...currentPlans, newPlan];
    console.log('Updated plans:', updatedPlans);
    this.plansSubject.next(updatedPlans);
    localStorage.setItem('successionPlans', JSON.stringify(updatedPlans));
    this.dashboardService.updateFromSuccessionPlans(updatedPlans);
  }

  updatePlan(id: string, plan: Omit<SuccessionPlan, 'id' | 'lastUpdated'>) {
    console.log('Updating plan:', id, plan);
    const currentPlans = this.plansSubject.value;
    const index = currentPlans.findIndex(p => p.id === id);
    if (index !== -1) {
      const updatedPlans = [...currentPlans];
      updatedPlans[index] = {
        ...plan,
        id,
        lastUpdated: new Date()
      };
      console.log('Updated plans:', updatedPlans);
      this.plansSubject.next(updatedPlans);
      localStorage.setItem('successionPlans', JSON.stringify(updatedPlans));
      this.dashboardService.updateFromSuccessionPlans(updatedPlans);
    }
  }

  deletePlan(id: string) {
    console.log('Deleting plan:', id);
    const currentPlans = this.plansSubject.value;
    const updatedPlans = currentPlans.filter(p => p.id !== id);
    console.log('Updated plans:', updatedPlans);
    this.plansSubject.next(updatedPlans);
    localStorage.setItem('successionPlans', JSON.stringify(updatedPlans));
    this.dashboardService.updateFromSuccessionPlans(updatedPlans);
  }
} 