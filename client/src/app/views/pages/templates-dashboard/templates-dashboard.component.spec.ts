import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesDashboardComponent } from './templates-dashboard.component';

describe('TemplatesDashboardComponent', () => {
  let component: TemplatesDashboardComponent;
  let fixture: ComponentFixture<TemplatesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatesDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplatesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
