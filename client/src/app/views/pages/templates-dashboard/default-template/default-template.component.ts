import { TemplateService } from "./../../../../services/template.service";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { TemplateIdDirective, ButtonDirective, FormModule } from "@coreui/angular";
import { RouterLink } from "@angular/router";
import { IconDirective } from "@coreui/icons-angular";
import { freeSet } from "@coreui/icons";
import { firstValueFrom, Observable } from "rxjs";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { AuthFacadeService } from "../../../../store/facade.service";
import { IUser } from "../../../../interfaces/IUser.interface";

@Component({
  selector: "app-default-template",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TemplateIdDirective,
    IconDirective,
    ButtonDirective,
    RouterLink,
    ButtonComponent,
    FormModule
  ],
  templateUrl: "./default-template.component.html",
  styleUrls: ["./default-template.component.scss"],
})
export class DefaultTemplateComponent {
  public templateForm: FormGroup;
  public icons = freeSet;
  public defaultTemplateIcon = "cil-plus";
  private _user$: Observable<IUser | null>;

  constructor(
    private formBuilder: FormBuilder,
    private _templateService: TemplateService,
    private _authFacadeService: AuthFacadeService
  ) {
    this.templateForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      questions: this.formBuilder.array([this.createQuestion()]),
    });

    this._user$ = this._authFacadeService.user$;
  }

  get questions(): FormArray {
    return this.templateForm.get("questions") as FormArray;
  }

  addQuestion(): void {
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index: number): void {
    if (index > 0) {
      this.questions.removeAt(index);
    }
  }

  public setCorrectIndex(questionIndex: number, answerIndex: number): void {
    const question = this.questions.at(questionIndex);
    question.get('correctAnswerIndex')?.setValue(answerIndex);
  }

  public getAnswerControls(questionIndex: number): AbstractControl[] {
    return (this.questions.at(questionIndex).get('answers') as FormArray).controls;
  }

  public getAnswerControlName(answerIdx: number): string {
    return answerIdx.toString();
  }


  createQuestion(): FormGroup {
    return this.formBuilder.group({
      question: ["", Validators.required],
      answers: this.formBuilder.array([this.createAnswer(), this.createAnswer(), this.createAnswer()]),
      correctAnswerIndex: [0, Validators.required]
    });
  }
  
  createAnswer(): FormControl {
    return this.formBuilder.control('', Validators.required);
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
