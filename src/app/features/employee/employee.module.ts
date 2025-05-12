import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';

@NgModule({
  // ❌ DO NOT use declarations for standalone components
  imports: [
    CommonModule,
    FormsModule,
    EmployeeRoutingModule,
    EmployeeListComponent // ✅ Import the standalone component here
  ]
})
export class EmployeeModule { }
