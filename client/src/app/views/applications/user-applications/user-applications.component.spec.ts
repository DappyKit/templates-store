import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApplicationService } from '../../../services/application.service';
import { AuthFacadeService } from '../../../store/facade.service';
import { UserApplicationsComponent } from './user-applications.component';

const applcations = [
    {
      createdAt: "2024-10-29T09:43:23.000Z",
      description: "Nemo dolores sequi a",
      id: 1,
      isPublic: false,
      title: "Dolorem dolor dolori"
    }
]
describe('UserApplicationsComponent', () => {
  let component: UserApplicationsComponent;
  let fixture: ComponentFixture<UserApplicationsComponent>;
  let applicationService: Partial<ApplicationService>;
  let authFacadeService: Partial<AuthFacadeService>;

  beforeEach(async () => {
    applicationService = {
      getApplications: jasmine.createSpy('getApplications').and.returnValue(of(applcations))
    };
    authFacadeService = {
      user$: of({ id: 123456, userName: 'test', displayName: 'test', photoUrl: '' })
    }
    await TestBed.configureTestingModule({
      imports: [UserApplicationsComponent],
      providers: [
        { provide: ApplicationService, useValue: applicationService },
        { provide: AuthFacadeService, useValue: authFacadeService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getApplications', () => {
    expect(applicationService.getApplications).toHaveBeenCalled();
  });

  xit('should render applications from ApplicationService if user exists', () => {
  });

});
