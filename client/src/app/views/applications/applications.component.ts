import { Component } from '@angular/core';
import { UserApplicationsComponent } from './user-applications/user-applications.component';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [UserApplicationsComponent],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent {

}
