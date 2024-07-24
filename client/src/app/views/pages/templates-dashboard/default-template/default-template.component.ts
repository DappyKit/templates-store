import { AuthFacadeService } from 'src/app/store/facade.service';
import { TemplateService } from './../../../../services/template.service';
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from "@angular/forms";
import {
  TemplateIdDirective,
  ButtonDirective,
} from "@coreui/angular";
import { RouterLink } from "@angular/router";
import { ButtonComponent } from "src/app/shared/components/button/button.component";
import { IconDirective } from "@coreui/icons-angular";
import { freeSet } from "@coreui/icons";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: "app-default-template",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TemplateIdDirective,
    IconDirective,
    ButtonDirective,
    RouterLink,
    ButtonComponent
  ],
  templateUrl: "./default-template.component.html",
  styleUrls: ["./default-template.component.scss"],
})
export class DefaultTemplateComponent {
  public templateForm: FormGroup;
  public icons = freeSet;
  public defaultTemplateIcon = "cil-plus";
  private _user$ = this._authFacadeService.user$;
  constructor(private formBuilder: FormBuilder, private _templateService: TemplateService,
    private _authFacadeService: AuthFacadeService
  ) {
    this.templateForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      questions: this.formBuilder.array([this.createQuestion()]),
    });
  }

  get questions(): FormArray {
    return this.templateForm.get("questions") as FormArray;
  }

  createQuestion(): FormGroup {
    return this.formBuilder.group({
      question: ["", Validators.required],
      options: this.formBuilder.group({
        option1: ["", Validators.required],
        option2: ["", Validators.required],
        option3: ["", Validators.required],
      }),
    });
  }

  public addQuestion(): void {
    this.questions.push(this.createQuestion());
  }

  public removeQuestion(index: number): void {
    if(!index){
      return;
    }
    this.questions.removeAt(index);
  }

  public async onSubmit(): Promise<void> {
    const user = await firstValueFrom(this._user$);
    if (this.templateForm.valid && user && user.id) {
      this._templateService.createTemplate(user.id, this.templateForm.value);
      console.log("Form Submitted", this.templateForm.value);
    } else {
      console.log("Form is invalid");
    }
  }
}
