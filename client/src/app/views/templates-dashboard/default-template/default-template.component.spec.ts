import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DefaultTemplateComponent } from "./default-template.component";

import { FormBuilder } from "@angular/forms";

import { ReplaySubject } from "rxjs";
import { TemplateService } from "../../../services/template.service";
import { AuthFacadeService } from "../../../store/facade.service";

describe("DefaultTemplateComponent", () => {
  let component: DefaultTemplateComponent;
  let fixture: ComponentFixture<DefaultTemplateComponent>;
  let user = new ReplaySubject(1);
  beforeEach(async () => {
    const templateServiceSpy  = {
      createApp: jasmine.createSpy('createApp')
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
