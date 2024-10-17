import { CommonModule, NgStyle, NgTemplateOutlet } from "@angular/common";
import { TemplateCardComponent } from "./template-card/template-card.component";
import { Router, RouterOutlet } from "@angular/router";
import { Component } from "@angular/core";
import { freeSet } from "@coreui/icons";
import { IconDirective } from "@coreui/icons-angular";

import {
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  GutterDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent,
} from "@coreui/angular";

import { DefaultTemplateComponent } from "./default-template/default-template.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { MultiItemCarouselComponent } from "../../../shared/components/carousel/multi-item-carousel.component";
import { BUTTON_STYLE } from "../../../constants/buttonColor";
import { ITemplateItem } from "../../../interfaces/ITemplateItem";

@Component({
  selector: "app-templates-dashboard",
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonComponent,
    IconDirective,
    RowComponent,
    ColComponent,
    GutterDirective,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    TemplateCardComponent,
    ContainerComponent,
    CarouselComponent,
    CarouselControlComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CommonModule,
    DefaultTemplateComponent,
    MultiItemCarouselComponent,
    NgTemplateOutlet,
    NgStyle,
  ],
  templateUrl: "./templates-dashboard.component.html",
  styleUrl: "./templates-dashboard.component.scss",
})
export class TemplatesDashboardComponent {
  public icons = freeSet;
  public defaultTemplateIcon = "cil-pin";
  public importTemplate = "cil-cloud-download";
  public importButtonColor = BUTTON_STYLE.primary;
  public buttonName = "Import template";
  public templates: ITemplateItem[] = [
    { id: '' , title: 'Card 1', description: 'Content for card 1', image: 'https://via.placeholder.com/150' }
  ];
  constructor(private router: Router){

  };
  
  public goToTemplate(id: string | undefined) {
    // if (id) {
    //   this.router.navigate([id]);
    // } else {
      this.router.navigate(['/templates/default']);
    // }
  };
}
