import { DefaultTemplateComponent } from './views/pages/templates-dashboard/default-template/default-template.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout';
import { canMatchGuard } from './guards/canMatchAuth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { title: 'Home' },
    children: [
      {
        path: 'templates',
        loadChildren: () => import('./views/pages/templates-dashboard/routes').then((m) => m.templatesDashboardRoutes),
        canLoad: [canMatchGuard],
      },
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: { title: 'Page 404' }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: { title: 'Page 500' }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: { title: 'Login Page' }
  },
  { path: '**', redirectTo: '404' }
];
