import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  DropdownModule,
  GridModule,
  HeaderModule,
  NavModule,
  ProgressModule,
  SidebarModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { DefaultHeaderComponent } from './header.component';
import { ReplaySubject } from 'rxjs';
import { AuthFacadeService } from '../../store/facade.service';

describe('DefaultHeaderComponent', () => {
  let component: DefaultHeaderComponent;
  let fixture: ComponentFixture<DefaultHeaderComponent>;
  let authFacadeService: Partial<AuthFacadeService>
  beforeEach(async () => {
    authFacadeService = {
      user$: new ReplaySubject(1)
    }
    await TestBed.configureTestingModule({
    imports: [GridModule, HeaderModule, IconModule, NavModule, BadgeModule, AvatarModule, DropdownModule, BreadcrumbModule, RouterTestingModule, SidebarModule, ProgressModule, ButtonGroupModule, ReactiveFormsModule, DefaultHeaderComponent],
    providers: [{
      provide: AuthFacadeService,
      useValue: authFacadeService
    }]
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
