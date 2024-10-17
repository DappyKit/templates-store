import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { LoginComponent } from './login.component';
import { IconModule } from '@coreui/icons-angular';
import { IconSetService } from '@coreui/icons-angular';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthFacadeService } from '../../../store/facade.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authFacadeSpy: jasmine.SpyObj<AuthFacadeService>;

  beforeEach(async () => {
    const authFacadeMock = jasmine.createSpyObj('AuthFacadeService', ['createChannel', 'selectQRcode$']);
    authFacadeMock.selectQRcode$ = of('mock-qr-code');
    await TestBed.configureTestingModule({
    imports: [FormModule, CardModule, GridModule, ButtonModule, IconModule, LoginComponent, BrowserAnimationsModule],
    providers: [IconSetService,{
      provide: AuthFacadeService, useValue: authFacadeMock
    }]
})
    .compileComponents();
    authFacadeSpy = TestBed.inject(AuthFacadeService) as jasmine.SpyObj<AuthFacadeService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
