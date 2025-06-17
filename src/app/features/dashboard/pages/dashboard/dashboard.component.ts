import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Needed for ngStyle
import Chart from 'chart.js/auto';
import { DashboardService, DashboardStats, PotentialDistribution, ReadinessDistribution, MatrixRow, RecentActivity, Insight } from '../../../../services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // ✅ Add CommonModule for ngStyle support
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('readinessChart') readinessChartRef!: ElementRef;
  @ViewChild('potentialChart') potentialChartRef!: ElementRef;

  today = new Date();
  stats: DashboardStats = {
    readyNow: 0,
    readyIn23Years: 0,
    readyIn4PlusYears: 0,
    contingency: 0,
    noSuccessor: 0
  };
  matrix: MatrixRow[] = [];
  recentActivities: RecentActivity[] = [];
  insights: Insight = { message: '', points: [] };

  private readinessChart: Chart | null = null;
  private potentialChart: Chart | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private dashboardService: DashboardService) {
    console.log('Dashboard component initialized');
    this.subscribeToChartData();
  }

  ngOnInit() {
    console.log('Dashboard component ngOnInit');
    this.subscriptions.push(
      this.dashboardService.getStats().subscribe(stats => {
        console.log('Received stats update:', stats);
        this.stats = stats;
      }),
      this.dashboardService.getMatrix().subscribe(matrix => {
        console.log('Received matrix update:', matrix);
        this.matrix = matrix;
      }),
      this.dashboardService.getRecentActivity().subscribe(activities => {
        console.log('Received activities update:', activities);
        this.recentActivities = activities;
      }),
      this.dashboardService.getInsights().subscribe(insights => {
        console.log('Received insights update:', insights);
        this.insights = insights;
      })
    );
  }

  ngAfterViewInit() {
    console.log('Dashboard component ngAfterViewInit');
    this.initCharts();
    this.subscribeToChartData();
  }

  ngOnDestroy() {
    console.log('Dashboard component ngOnDestroy');
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.readinessChart?.destroy();
    this.potentialChart?.destroy();
  }

  private subscribeToChartData() {
    console.log('Subscribing to chart data');
    this.subscriptions.push(
      this.dashboardService.getReadinessDistribution().subscribe(distribution => {
        console.log('Received readiness distribution update:', distribution);
        this.updateReadinessChart(distribution);
      }),
      this.dashboardService.getPotentialDistribution().subscribe(distribution => {
        console.log('Received potential distribution update:', distribution);
        this.updatePotentialChart(distribution);
      })
    );
  }

  private initCharts() {
    console.log('Initializing charts');
    this.initReadinessChart();
    this.initPotentialChart();
  }

  private initReadinessChart() {
    if (this.readinessChartRef) {
      console.log('Creating readiness chart');
      this.readinessChart = new Chart(this.readinessChartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Ready Now', 'Ready 1–2 Yrs', 'Ready 3+ Yrs', 'Not Ready'],
          datasets: [
            {
              label: 'Employees',
              data: [0, 0, 0, 0],
              backgroundColor: ['#059669', '#f59e0b', '#f97316', '#ef4444'],
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.05)',
              },
              border: {
                display: false,
              },
            },
            x: {
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
            },
          },
        },
      });
    }
  }

  private initPotentialChart() {
    if (this.potentialChartRef) {
      console.log('Creating potential chart');
      this.potentialChart = new Chart(this.potentialChartRef.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['High Potential', 'Potential to Watch', 'Lateral Potential', 'At Potential'],
          datasets: [
            {
              data: [0, 0, 0, 0],
              backgroundColor: ['#3B82F6', '#8B5CF6', '#F97316', '#6B7280'],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          cutout: '70%',
        },
      });
    }
  }

  private updateReadinessChart(distribution: ReadinessDistribution) {
    if (this.readinessChart) {
      console.log('Updating readiness chart with:', distribution);
      this.readinessChart.data.datasets[0].data = [
        distribution.readyNow,
        distribution.ready12Years,
        distribution.ready3PlusYears,
        distribution.notReady
      ];
      this.readinessChart.update();
    }
  }

  private updatePotentialChart(distribution: PotentialDistribution) {
    if (this.potentialChart) {
      console.log('Updating potential chart with:', distribution);
      this.potentialChart.data.datasets[0].data = [
        distribution.highPotential,
        distribution.potentialToWatch,
        distribution.lateralPotential,
        distribution.atPotential
      ];
      this.potentialChart.update();
    }
  }
}
