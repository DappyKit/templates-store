import { BUTTON_STYLE } from '../../../constants/buttonColor';
import { ButtonComponent } from "./../../../shared/components/button/button.component";
import { AuthFacadeService } from "./../../../store/facade.service";
import { SharedModalComponent } from "./../../../shared/components/modal/modal.component";
import { Component, OnInit } from "@angular/core";
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
  Colors,
} from "@coreui/angular";
import { QRCodeModule } from "angularx-qrcode";
import { Observable } from "rxjs";
import { freeSet } from '@coreui/icons';

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
    ButtonComponent,
    NgStyle,
  ],
})
export class LoginComponent implements OnInit {
  public qrString$: Observable<string | null>;
  public modalTitle = "Sign in with Farcaster";
  public modalSubTitle = "Scan with your phone's camera to continue";
  public buttonStyle: Colors = BUTTON_STYLE.light;
  public buttonText = "I'm using my phone";
  public icons = freeSet;
  constructor(private _authFacade: AuthFacadeService) {
    this.qrString$ = this._authFacade.selectQRcode$;
  }

  ngOnInit(): void {
    this._authFacade.createChannel();
  }

  public login() {
    this.qrString$.subscribe((a: string | null)=> a ? window.location.href = a : '');
  }
}
