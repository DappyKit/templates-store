import { ITemplateItem } from '../../../interfaces/ITemplateItem';
import { CommonModule, NgFor } from "@angular/common";
import {
  AfterContentInit,
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  CarouselComponent,
  CarouselControlComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective,
} from "@coreui/angular";

@Component({
  selector: "app-multi-item-carousel",
  standalone: true,
  templateUrl: "./multi-item-carousel.component.html",
  styleUrls: ["./multi-item-carousel.component.scss"],
  imports: [
    ThemeDirective,
    CarouselComponent,
    CarouselInnerComponent,
    NgFor,
    CarouselItemComponent,
    CarouselControlComponent,
    RouterLink,
    CommonModule,
  ],
})
export class MultiItemCarouselComponent implements AfterContentInit, OnInit {
  @Input() items!: ITemplateItem[];
  public chunkedSlides: ITemplateItem[][] = [];
  @ContentChild(TemplateRef) template!: TemplateRef<any>;

  ngAfterContentInit() {
    if (!this.template) {
      throw new Error("You must pass a template to <app-multi-item-carousel>");
    }
  }

  ngOnInit() {
    this.chunkSlides();
  }

  chunkSlides() {
    if (!this.items.length) {
      return;
    }
    const chunkSize = 3;
    for (let i = 0; i < this.items.length; i += chunkSize) {
      this.chunkedSlides.push(this.items.slice(i, i + chunkSize));
    }
  }
}
