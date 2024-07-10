import { Component, HostListener, Input, Output, EventEmitter } from "@angular/core";
import { ButtonDirective, Colors } from "@coreui/angular";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  standalone: true,
  imports: [ButtonDirective]
})
export class ButtonComponent {
  @Input() buttonColor!: Colors;
  @Input() disabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    } else {
      this.click();
    }
  }

  public click(): void {
    this.buttonClick.emit();
  }
}
