import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsComponent } from './applications.component';
import { UserApplicationsComponent } from './user-applications/user-applications.component';
import { AuthFacadeService } from '../../store/facade.service';
import { ApplicationService } from '../../services/application.service';
import { of } from 'rxjs';

describe('ApplicationsComponent', () => {
  let component: ApplicationsComponent;
  let fixture: ComponentFixture<ApplicationsComponent>;
  let applicationService: Partial<ApplicationService>;
  let authFacadeService: Partial<AuthFacadeService>;

  beforeEach(async () => {
    applicationService = {
      getApplications: jasmine.createSpy('getApplications').and.returnValue(of([]))
    };
    authFacadeService = {
      user$: of({ id: 123456, userName: 'test', displayName: 'test', photoUrl: '' })
    }
    await TestBed.configureTestingModule({
      imports: [ApplicationsComponent, UserApplicationsComponent],
      providers: [
        { provide: ApplicationService, useValue: applicationService },
        { provide: AuthFacadeService, useValue: authFacadeService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
