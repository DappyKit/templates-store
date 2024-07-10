import { Routes } from '@angular/router';
import { TemplatesDashboardComponent } from './templates-dashboard.component';
import { DefaultTemplateComponent } from './default-template/default-template.component';

export const templatesDashboardRoutes: Routes = [
  {
    path: '',
    component: TemplatesDashboardComponent,
    data: { title: 'templates-dashboard' },
   
  },
  {
    path: 'default',
    component: DefaultTemplateComponent,
  },
];
