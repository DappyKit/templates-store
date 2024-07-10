import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultTemplateComponent } from './template-card.component';

describe('DefaultTemplateComponent', () => {
  let component: DefaultTemplateComponent;
  let fixture: ComponentFixture<DefaultTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
