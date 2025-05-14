import { Routes } from '@angular/router';

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
    ],
  },
];
