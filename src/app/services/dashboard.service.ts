import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SuccessionPlan } from '../features/employee/models/succession-plan.model';
import { ExportService } from './export.service';

export interface DashboardStats {
  readyNow: number;
  readyIn23Years: number;
  readyIn4PlusYears: number;
  contingency: number;
  noSuccessor: number;
}

export interface PotentialDistribution {
  highPotential: number;
  potentialToWatch: number;
  lateralPotential: number;
  atPotential: number;
}

export interface ReadinessDistribution {
  readyNow: number;
  ready12Years: number;
  ready3PlusYears: number;
  notReady: number;
}

export interface MatrixRow {
  label: string;
  color: string;
  readyNow: number;
  ready12: number;
  ready3plus: number;
  notReady: number;
}

export interface RecentActivity {
  type: 'update' | 'add' | 'review';
  message: string;
  timestamp: Date;
}

export interface Insight {
  message: string;
  points: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private statsSubject = new BehaviorSubject<DashboardStats>({
    readyNow: 0,
    readyIn23Years: 0,
    readyIn4PlusYears: 0,
    contingency: 0,
    noSuccessor: 0
  });

  private potentialDistributionSubject = new BehaviorSubject<PotentialDistribution>({
    highPotential: 0,
    potentialToWatch: 0,
    lateralPotential: 0,
    atPotential: 0
  });

  private readinessDistributionSubject = new BehaviorSubject<ReadinessDistribution>({
    readyNow: 0,
    ready12Years: 0,
    ready3PlusYears: 0,
    notReady: 0
  });

  private matrixSubject = new BehaviorSubject<MatrixRow[]>([]);
  private recentActivitySubject = new BehaviorSubject<RecentActivity[]>([]);
  private insightsSubject = new BehaviorSubject<Insight>({
    message: '',
    points: []
  });

  constructor(private exportService: ExportService) {
    this.loadData();
  }

  private loadData() {
    const storedData = localStorage.getItem('dashboardData');
    if (storedData) {
      const data = JSON.parse(storedData);
      console.log('Loading dashboard data:', data);
      this.updateAllData(data);
    } else {
      console.log('No stored dashboard data found, initializing with empty data');
      this.updateAllData({
        stats: this.statsSubject.value,
        potentialDistribution: this.potentialDistributionSubject.value,
        readinessDistribution: this.readinessDistributionSubject.value,
        matrix: [],
        recentActivity: [],
        insights: this.insightsSubject.value
      });
    }
  }

  private updateAllData(data: any) {
    this.statsSubject.next(data.stats);
    this.potentialDistributionSubject.next(data.potentialDistribution);
    this.readinessDistributionSubject.next(data.readinessDistribution);
    this.matrixSubject.next(data.matrix);
    this.recentActivitySubject.next(data.recentActivity);
    this.insightsSubject.next(data.insights);
  }

  // Observable getters
  getStats(): Observable<DashboardStats> {
    return this.statsSubject.asObservable();
  }

  getPotentialDistribution(): Observable<PotentialDistribution> {
    return this.potentialDistributionSubject.asObservable();
  }

  getReadinessDistribution(): Observable<ReadinessDistribution> {
    return this.readinessDistributionSubject.asObservable();
  }

  getMatrix(): Observable<MatrixRow[]> {
    return this.matrixSubject.asObservable();
  }

  getRecentActivity(): Observable<RecentActivity[]> {
    return this.recentActivitySubject.asObservable();
  }

  getInsights(): Observable<Insight> {
    return this.insightsSubject.asObservable();
  }

  // Update methods
  updateStats(stats: DashboardStats) {
    this.statsSubject.next(stats);
    this.saveToStorage();
  }

  updatePotentialDistribution(distribution: PotentialDistribution) {
    this.potentialDistributionSubject.next(distribution);
    this.saveToStorage();
  }

  updateReadinessDistribution(distribution: ReadinessDistribution) {
    this.readinessDistributionSubject.next(distribution);
    this.saveToStorage();
  }

  updateMatrix(matrix: MatrixRow[]) {
    this.matrixSubject.next(matrix);
    this.saveToStorage();
  }

  addRecentActivity(activity: RecentActivity) {
    const currentActivities = this.recentActivitySubject.value;
    this.recentActivitySubject.next([activity, ...currentActivities].slice(0, 5));
    this.saveToStorage();
  }

  updateInsights(insights: Insight) {
    this.insightsSubject.next(insights);
    this.saveToStorage();
  }

  private saveToStorage() {
    const data = {
      stats: this.statsSubject.value,
      potentialDistribution: this.potentialDistributionSubject.value,
      readinessDistribution: this.readinessDistributionSubject.value,
      matrix: this.matrixSubject.value,
      recentActivity: this.recentActivitySubject.value,
      insights: this.insightsSubject.value
    };
    localStorage.setItem('dashboardData', JSON.stringify(data));
  }

  updateFromSuccessionPlans(plans: SuccessionPlan[]) {
    console.log('Updating dashboard from plans:', plans);
    
    // Update stats
    const stats: DashboardStats = {
      readyNow: plans.filter(p => p.readinessLevel === 'Ready Now').length,
      readyIn23Years: plans.filter(p => p.readinessLevel === 'Ready in 1-2 Years').length,
      readyIn4PlusYears: plans.filter(p => p.readinessLevel === 'Ready in 3-5 Years').length,
      contingency: plans.filter(p => p.criticalTalent).length,
      noSuccessor: 0
    };
    console.log('Calculated stats:', stats);
    this.updateStats(stats);

    // Update potential distribution
    const potentialDistribution: PotentialDistribution = {
      highPotential: plans.filter(p => p.potential === 'High Potential').length,
      potentialToWatch: plans.filter(p => p.potential === 'Potential to Watch').length,
      lateralPotential: plans.filter(p => p.potential === 'Lateral Potential').length,
      atPotential: plans.filter(p => p.potential === 'At Potential').length
    };
    console.log('Calculated potential distribution:', potentialDistribution);
    this.updatePotentialDistribution(potentialDistribution);

    // Update readiness distribution
    const readinessDistribution: ReadinessDistribution = {
      readyNow: plans.filter(p => p.readinessLevel === 'Ready Now').length,
      ready12Years: plans.filter(p => p.readinessLevel === 'Ready in 1-2 Years').length,
      ready3PlusYears: plans.filter(p => p.readinessLevel === 'Ready in 3-5 Years').length,
      notReady: plans.filter(p => p.readinessLevel === 'Not Ready').length
    };
    console.log('Calculated readiness distribution:', readinessDistribution);
    this.updateReadinessDistribution(readinessDistribution);

    // Update matrix
    const matrix: MatrixRow[] = [
      {
        label: 'High Potential',
        color: '#3B82F6',
        readyNow: plans.filter(p => p.potential === 'High Potential' && p.readinessLevel === 'Ready Now').length,
        ready12: plans.filter(p => p.potential === 'High Potential' && p.readinessLevel === 'Ready in 1-2 Years').length,
        ready3plus: plans.filter(p => p.potential === 'High Potential' && p.readinessLevel === 'Ready in 3-5 Years').length,
        notReady: plans.filter(p => p.potential === 'High Potential' && p.readinessLevel === 'Not Ready').length
      },
      {
        label: 'Potential to Watch',
        color: '#8B5CF6',
        readyNow: plans.filter(p => p.potential === 'Potential to Watch' && p.readinessLevel === 'Ready Now').length,
        ready12: plans.filter(p => p.potential === 'Potential to Watch' && p.readinessLevel === 'Ready in 1-2 Years').length,
        ready3plus: plans.filter(p => p.potential === 'Potential to Watch' && p.readinessLevel === 'Ready in 3-5 Years').length,
        notReady: plans.filter(p => p.potential === 'Potential to Watch' && p.readinessLevel === 'Not Ready').length
      },
      {
        label: 'Lateral Potential',
        color: '#F97316',
        readyNow: plans.filter(p => p.potential === 'Lateral Potential' && p.readinessLevel === 'Ready Now').length,
        ready12: plans.filter(p => p.potential === 'Lateral Potential' && p.readinessLevel === 'Ready in 1-2 Years').length,
        ready3plus: plans.filter(p => p.potential === 'Lateral Potential' && p.readinessLevel === 'Ready in 3-5 Years').length,
        notReady: plans.filter(p => p.potential === 'Lateral Potential' && p.readinessLevel === 'Not Ready').length
      },
      {
        label: 'At Potential',
        color: '#6B7280',
        readyNow: plans.filter(p => p.potential === 'At Potential' && p.readinessLevel === 'Ready Now').length,
        ready12: plans.filter(p => p.potential === 'At Potential' && p.readinessLevel === 'Ready in 1-2 Years').length,
        ready3plus: plans.filter(p => p.potential === 'At Potential' && p.readinessLevel === 'Ready in 3-5 Years').length,
        notReady: plans.filter(p => p.potential === 'At Potential' && p.readinessLevel === 'Not Ready').length
      }
    ];
    console.log('Calculated matrix:', matrix);
    this.updateMatrix(matrix);

    // Add recent activity
    const activity: RecentActivity = {
      type: 'add',
      message: `Updated dashboard with ${plans.length} succession plans`,
      timestamp: new Date()
    };
    console.log('Adding recent activity:', activity);
    this.addRecentActivity(activity);

    // Update insights
    const insights: Insight = {
      message: 'Succession Planning Overview',
      points: [
        `${stats.readyNow} employees are ready for promotion now`,
        `${stats.readyIn23Years} employees will be ready in 2-3 years`,
        `${stats.contingency} critical positions have contingency plans`,
        `${stats.noSuccessor} positions need immediate attention`
      ]
    };
    console.log('Updating insights:', insights);
    this.updateInsights(insights);
  }

  exportToExcel(data: any[]) {
    this.exportService.exportToExcel(data);
  }
} 