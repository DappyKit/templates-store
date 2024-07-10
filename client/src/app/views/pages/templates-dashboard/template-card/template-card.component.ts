import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  ButtonDirective,
  ColComponent,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  RowComponent,
  TemplateIdDirective,
  ThemeDirective,
  WidgetStatAComponent,
} from "@coreui/angular";
import { freeSet } from "@coreui/icons";
import { IconDirective } from "@coreui/icons-angular";
import { BUTTON_STYLE } from "src/app/constants/buttonColor";
import { ButtonComponent } from "src/app/shared/components/button/button.component";
import { NgStyle, NgTemplateOutlet } from "@angular/common";

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
    NgTemplateOutlet,
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
