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
    const storedPlans = localStorage.getItem('successionPlans');
    this.plans = storedPlans ? JSON.parse(storedPlans) : [];
  }
}
