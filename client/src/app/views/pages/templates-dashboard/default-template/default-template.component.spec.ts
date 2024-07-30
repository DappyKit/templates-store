import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DefaultTemplateComponent } from "./default-template.component";
import { TemplateService } from "src/app/services/template.service";
import { FormBuilder } from "@angular/forms";
import { AuthFacadeService } from "src/app/store/facade.service";
import { ReplaySubject } from "rxjs";

describe("DefaultTemplateComponent", () => {
  let component: DefaultTemplateComponent;
  let fixture: ComponentFixture<DefaultTemplateComponent>;
  let user = new ReplaySubject(1);
  beforeEach(async () => {
    const templateServiceSpy  = {
      createTemplate: jasmine.createSpy('createTemplate')
    }
    await TestBed.configureTestingModule({
      imports: [DefaultTemplateComponent],

      providers: [FormBuilder, 
        {
        provide: TemplateService, useValue: templateServiceSpy
      },
      {
        provide: AuthFacadeService, useValue: user
      },
    ],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
