import { Component, Input } from "@angular/core";
import {
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
} from "@coreui/angular";

@Component({
  selector: "app-modal",
  standalone: true,
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.scss",
  imports: [
    ButtonCloseDirective,
    ButtonDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
  ],
})
export class SharedModalComponent {
  @Input() public isModalHeader!: boolean;
  @Input() public isModalFooter!: boolean;
}
