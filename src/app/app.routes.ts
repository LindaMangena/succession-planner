import { Routes } from '@angular/router';
import { EmployeeListComponent } from './features/employee/pages/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './features/employee/pages/employee-detail.component';
import { SuccessionPlanComponent } from './features/employee/pages/succession-plan/succession-plan.component';
import { SuccessionPlanFormComponent } from './features/employee/pages/succession-plan-form/succession-plan-form.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/layout/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'employees',
        component: EmployeeListComponent,
      },
      {
        path: 'employees/:id',
        component: EmployeeDetailComponent,
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('./features/roles/pages/key-roles/key-roles.component').then(
            (m) => m.KeyRolesComponent
          ),
      },
      {
        path: 'successors',
        loadComponent: () =>
          import('./features/successors/pages/successors/successors.component').then(
            (m) => m.SuccessorsComponent
          ),
      },
      {
        path: 'development',
        loadComponent: () =>
          import('./features/development/pages/development/development.component').then(
            (m) => m.DevelopmentComponent
          ),
      },
      {
        path: 'employees/:id/succession-plan',
        loadComponent: () =>
          import('./features/employee/pages/add-succession-plan.component').then(
            (m) => m.AddSuccessionPlanComponent
          ),
      },
      {
        path: 'comments',
        loadComponent: () =>
          import('./features/comments/pages/manager-notes/manager-notes.component').then(
            (m) => m.ManagerNotesComponent
          ),
      },
      {
        path: 'admin/users',
        loadComponent: () =>
          import('./features/admin/pages/user-management/user-management.component').then(
            (m) => m.UserManagementComponent
          ),
      },
      {
        path: 'succession-plans',
        component: SuccessionPlanComponent,
      },
      {
        path: 'succession-plans/new',
        component: SuccessionPlanFormComponent,
      },
      {
        path: 'succession-plans/:id/edit',
        component: SuccessionPlanFormComponent,
      },
    ],
  },
];
