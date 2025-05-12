import { Routes } from '@angular/router';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './features/dashboard/pages/dashboard/dashboard.component'
          ).then((m) => m.DashboardComponent),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./features/employee/employee.module').then(
            (m) => m.EmployeeModule
          ),
      },
      {
        path: 'employees/:id',
        loadComponent: () =>
          import('./features/employee/pages/employee-detail.component').then(
            (m) => m.EmployeeDetailComponent
          ),
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
          import(
            './features/successors/pages/successors/successors.component'
          ).then((m) => m.SuccessorsComponent),
      },
      {
        path: 'development',
        loadComponent: () =>
          import(
            './features/development/pages/development/development.component'
          ).then((m) => m.DevelopmentComponent),
      },
      {
        path: 'employees/:id/succession-plan',
        loadComponent: () =>
          import(
            './features/employee/pages/add-succession-plan.component'
          ).then((m) => m.AddSuccessionPlanComponent),
      },
      {
        path: 'comments',
        loadComponent: () =>
          import(
            './features/comments/pages/manager-notes/manager-notes.component'
          ).then((m) => m.ManagerNotesComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
];
