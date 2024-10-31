import { Routes } from '@angular/router';
import { DefaultTemplateComponent } from './default-template/default-template.component';
import { TemplatesDashboardComponent } from './templates-dashboard.component';


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
