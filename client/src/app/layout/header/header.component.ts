import { Component, Input } from "@angular/core";
import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
  ProgressBarDirective,
  ProgressComponent,
  SidebarToggleDirective,
  TextColorDirective,
  ThemeDirective,
} from "@coreui/angular";
import { CommonModule, NgStyle, NgTemplateOutlet } from "@angular/common";
import { IconDirective } from "@coreui/icons-angular";
import { Observable } from "rxjs";
import { IUser } from "../../interfaces/IUser.interface";
import { AuthFacadeService } from "../../store/facade.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  standalone: true,
  imports: [
    ContainerComponent,
    HeaderTogglerDirective,
    SidebarToggleDirective,
    IconDirective,
    HeaderNavComponent,
    NavItemComponent,
    NavLinkDirective,
    // RouterLink,
    // RouterLinkActive,
    NgTemplateOutlet,
    BreadcrumbRouterComponent,
    ThemeDirective,
    DropdownComponent,
    DropdownToggleDirective,
    TextColorDirective,
    AvatarComponent,
    DropdownMenuDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    BadgeComponent,
    DropdownDividerDirective,
    ProgressBarDirective,
    ProgressComponent,
    CommonModule,
    NgStyle,
  ],
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = "sidebar1";
  public user$: Observable<IUser | null>;

  constructor(private _authFacade: AuthFacadeService) {
    super();
    this.user$ = this._authFacade.user$;
  }
}
