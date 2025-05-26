import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Needed for ngStyle
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // ✅ Add CommonModule for ngStyle support
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('readinessChart') readinessChartRef!: ElementRef;
  @ViewChild('potentialChart') potentialChartRef!: ElementRef;

  matrix = [
    { label: 'High Potential', color: '#3B82F6', readyNow: 2, ready12: 1, ready3plus: 0, notReady: 0 },
    { label: 'Potential to Watch', color: '#8B5CF6', readyNow: 0, ready12: 2, ready3plus: 0, notReady: 0 },
    { label: 'Lateral Potential', color: '#F97316', readyNow: 0, ready12: 1, ready3plus: 1, notReady: 0 },
    { label: 'At Potential', color: '#6B7280', readyNow: 0, ready12: 0, ready3plus: 0, notReady: 1 },
  ];

  ngAfterViewInit() {
    this.initReadinessChart();
    this.initPotentialChart();
  }

  initReadinessChart() {
    new Chart(this.readinessChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Ready Now', 'Ready 1–2 Yrs', 'Ready 3+ Yrs', 'Not Ready'],
        datasets: [
          {
            label: 'Employees',
            data: [2, 4, 1, 1],
            backgroundColor: ['#059669', '#f59e0b', '#f97316', '#ef4444'],
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
          },
        },
      },
    });
  }

  initPotentialChart() {
    new Chart(this.potentialChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['High Potential', 'Potential to Watch', 'Lateral Potential', 'At Potential'],
        datasets: [
          {
            data: [38, 25, 25, 13],
            backgroundColor: ['#3B82F6', '#8B5CF6', '#F97316', '#6B7280'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }
}
