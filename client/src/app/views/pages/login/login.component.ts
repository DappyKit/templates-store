import { AuthFacadeService } from "./../../../store/facade.service";
import { SharedModalComponent } from "./../../../shared/components/modal/modal.component";
import { Component, OnInit, inject } from "@angular/core";
import { CommonModule, NgStyle } from "@angular/common";
import { IconDirective } from "@coreui/icons-angular";
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from "@coreui/angular";
import { QRCodeModule } from "angularx-qrcode";
import { Observable } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,

  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    QRCodeModule,
    SharedModalComponent,
    CommonModule,
    NgStyle,
  ],
})
export class LoginComponent implements OnInit {
  public qrString$: Observable<string | null>;

  constructor(private _authFacade: AuthFacadeService) {
    this.qrString$ = this._authFacade.selectQRcode$;
  }

  ngOnInit(): void {
    this._authFacade.createChannel();
  }
}

