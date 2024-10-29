import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../../../services/application.service';
import { AuthFacadeService } from '../../../../store/facade.service';
import { Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IApplication } from '../../../../interfaces/IApplication';

@Component({
  selector: 'app-user-applications',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user-applications.component.html',
  styleUrl: './user-applications.component.scss'
})
export class UserApplicationsComponent implements OnInit {
  public applications$!: Observable<IApplication[]>
  constructor(private _applicationService: ApplicationService, private _facadeService: AuthFacadeService) {
    
  }

    ngOnInit(): void {
       this.applications$ = this._facadeService.user$.pipe(
        switchMap((user) => {
          return user?.id ? this._applicationService.getApplications(user.id) : of([])
        }),
       )
    }
}
