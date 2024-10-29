import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  BorderDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  CardTextDirective,
  CardTitleDirective,
  ColComponent,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  RowComponent,
  TemplateIdDirective,
  TextColorDirective,
  ThemeDirective,
  WidgetStatAComponent,
} from "@coreui/angular";
import { freeSet } from "@coreui/icons";
import { IconDirective } from "@coreui/icons-angular";
import { CommonModule, NgFor, NgStyle, NgTemplateOutlet } from "@angular/common";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { BUTTON_STYLE } from "../../../../constants/buttonColor";

@Component({
  selector: "app-template-card",
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    WidgetStatAComponent,
    TemplateIdDirective,
    IconDirective,
    ThemeDirective,
    DropdownComponent,
    ButtonDirective,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
    RouterLink,
    ButtonComponent,
    NgStyle,
    CommonModule,
    NgTemplateOutlet,

    NgFor, TextColorDirective, CardComponent, BorderDirective, CardHeaderComponent, CardBodyComponent, CardTitleDirective, CardTextDirective, ButtonDirective
  ],
  templateUrl: "./template-card.component.html",
  styleUrl: "./template-card.component.scss",
})
export class TemplateCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() image!: string;
  public buttonColor = BUTTON_STYLE.light;
  public icons = freeSet;

  @Output() openTemplateEmitter = new EventEmitter<void>()

  openTemplate() {
    this.openTemplateEmitter.emit();
  }
}
