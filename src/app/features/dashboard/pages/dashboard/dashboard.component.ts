import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // Succession Readiness Summary
  public readyNowCount = 5;
  public readyInTwoToThreeYears = 3;
  public readyInFourPlusYears = 2;

  // Key Metrics
  public totalEmployees = 25;
  public highRetentionRisk = 4;
  public topPerformers = 8;
}
