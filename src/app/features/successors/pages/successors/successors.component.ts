import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-successors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './successors.component.html',
  styleUrls: ['./successors.component.scss']
})
export class SuccessorsComponent {
  plans: any[] = [];

  ngOnInit() {
    this.loadPlans();
  }

  loadPlans() {
    const storedPlans = localStorage.getItem('successionPlans');
    this.plans = storedPlans ? JSON.parse(storedPlans) : [];
  }

  deletePlan(index: number) {
    this.plans.splice(index, 1);
    localStorage.setItem('successionPlans', JSON.stringify(this.plans));
  }

  confirmDelete(index: number) {
  const confirmed = confirm('Are you sure you want to delete this succession plan?');
  if (confirmed) {
    this.plans.splice(index, 1);
    localStorage.setItem('successionPlans', JSON.stringify(this.plans));
  }
}

}
