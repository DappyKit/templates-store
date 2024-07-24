import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import {
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
} from "@coreui/angular";
import { Subscription } from "rxjs";
import { SharedModalService } from "src/app/services/sharedModal.service";

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
export class SharedModalComponent implements AfterViewInit, OnDestroy {
  @Input() public isModalHeader!: boolean;
  @Input() public modalTitle!: string;
  @Input() public modalSubTitle!: string;
  @Input() public isModalFooter!: boolean;
  @Input() public isCloseButton!: boolean;
  @Input() public modalVisible!: boolean;
  @Input() public id!: string;
  
  private modalSubscription!: Subscription;

  constructor(
    private modalService: SharedModalService,
    public changeDetectorRef: ChangeDetectorRef
  ) {}

  @Input()
  set show(value) {
    this._show = value;
    this.modalService.toggle({
      show: value,
      id: this.id,
    });
  }
  get show() {
    return this._show;
  }
  private _show = false;

  @ViewChild("modal") private modal!: ModalComponent;

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }

  handleClose($event: MouseEvent) {
    this.show = false;
    this.modalVisible = false;
    this.modalService.toggle({ show: false, id: this.id });
    this.changeDetectorRef.markForCheck();
  }

  ngAfterViewInit(): void {
    this.modalSubscription = this.modalService.modalState$.subscribe((next) => {
      if (next && next.id === this.modal.id) {
        this.modalVisible = next.show ?? false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }
}
