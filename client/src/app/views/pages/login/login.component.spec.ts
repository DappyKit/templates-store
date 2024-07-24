import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { LoginComponent } from './login.component';
import { IconModule } from '@coreui/icons-angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { AuthFacadeService } from 'src/app/store/facade.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let iconSetService: IconSetService;
  let authFacadeSpy: jasmine.SpyObj<AuthFacadeService>;

  beforeEach(async () => {
    const authFacadeMock = jasmine.createSpyObj('AuthFacadeService', ['createChannel', 'selectQRcode$']);
    authFacadeMock.selectQRcode$ = of('mock-qr-code');
    await TestBed.configureTestingModule({
    imports: [FormModule, CardModule, GridModule, ButtonModule, IconModule, LoginComponent],
    providers: [IconSetService,{
      provide: AuthFacadeService, useValue: authFacadeMock
    }]
})
    .compileComponents();
    authFacadeSpy = TestBed.inject(AuthFacadeService) as jasmine.SpyObj<AuthFacadeService>;
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
