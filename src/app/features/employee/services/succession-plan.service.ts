import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SuccessionPlan } from '../models/succession-plan.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SuccessionPlanService {
  private plans: SuccessionPlan[] = [];
  private plansSubject = new BehaviorSubject<SuccessionPlan[]>([]);

  constructor() {
    this.loadPlans();
  }

  private loadPlans(): void {
    const storedPlans = localStorage.getItem('successionPlans');
    if (storedPlans) {
      this.plans = JSON.parse(storedPlans);
      this.plansSubject.next(this.plans);
    }
  }

  private savePlans(): void {
    localStorage.setItem('successionPlans', JSON.stringify(this.plans));
    this.plansSubject.next(this.plans);
  }

  getPlans(): Observable<SuccessionPlan[]> {
    return this.plansSubject.asObservable();
  }

  getPlanById(id: string): SuccessionPlan | undefined {
    return this.plans.find(plan => plan.id === id);
  }

  getPlansByEmployeeId(employeeId: string): SuccessionPlan[] {
    return this.plans.filter(plan => plan.employeeId === employeeId);
  }

  createPlan(plan: Omit<SuccessionPlan, 'id' | 'lastUpdated'>): SuccessionPlan {
    const newPlan: SuccessionPlan = {
      ...plan,
      id: uuidv4(),
      lastUpdated: new Date()
    };
    this.plans.push(newPlan);
    this.savePlans();
    return newPlan;
  }

  updatePlan(id: string, updates: Partial<SuccessionPlan>): SuccessionPlan | undefined {
    const index = this.plans.findIndex(plan => plan.id === id);
    if (index === -1) return undefined;

    const updatedPlan = {
      ...this.plans[index],
      ...updates,
      lastUpdated: new Date()
    };
    this.plans[index] = updatedPlan;
    this.savePlans();
    return updatedPlan;
  }

  deletePlan(id: string): boolean {
    const index = this.plans.findIndex(plan => plan.id === id);
    if (index === -1) return false;

    this.plans.splice(index, 1);
    this.savePlans();
    return true;
  }

  getCriticalTalent(): SuccessionPlan[] {
    return this.plans.filter(plan => plan.criticalTalent);
  }

  getPlansByReadinessLevel(level: SuccessionPlan['readinessLevel']): SuccessionPlan[] {
    return this.plans.filter(plan => plan.readinessLevel === level);
  }

  getPlansByPotential(potential: SuccessionPlan['potential']): SuccessionPlan[] {
    return this.plans.filter(plan => plan.potential === potential);
  }
} 