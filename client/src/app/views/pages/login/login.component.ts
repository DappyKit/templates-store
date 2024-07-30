import { ButtonComponent } from "./../../../shared/components/button/button.component";
import { AuthFacadeService } from "./../../../store/facade.service";
import { SharedModalComponent } from "./../../../shared/components/modal/modal.component";
import { Component, OnDestroy, OnInit } from "@angular/core";
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
import { Observable, Subscription } from "rxjs";
import { freeSet } from '@coreui/icons';
import { BUTTON_STYLE } from "src/app/constants/buttonColor";
import { MODAL_ID } from "src/app/constants/modal-id";

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
export class LoginComponent implements OnInit, OnDestroy {
  public qrString$: Observable<string | null>;
  public modalTitle = "Sign in with Farcaster";
  public modalSubTitle = "Scan with your phone's camera to continue";
  public buttonStyle: Colors = BUTTON_STYLE.light;
  public buttonText = "I'm using my phone";
  public icons = freeSet;
  public id = MODAL_ID.loginComponent;
  public modalVisible!: boolean;
  private subscription!: Subscription;
  
  constructor(private _authFacade: AuthFacadeService) {
    this.qrString$ = this._authFacade.selectQRcode$;
  }

  ngOnInit(): void {
    this._authFacade.createChannel();
  }

  public login() {
    this.subscription = this.qrString$.subscribe((href: string | null) => href ? window.location.href = href : '');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
