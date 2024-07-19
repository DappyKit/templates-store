import { Component, computed, DestroyRef, inject, Input } from "@angular/core";
import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent,
  ColorModeService,
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
import { ActivatedRoute, RouterLink, RouterLinkActive } from "@angular/router";
import { IconDirective } from "@coreui/icons-angular";
import { IUser } from "src/app/interfaces/IUser.interface";
import { Observable } from "rxjs";
import { AuthFacadeService } from "src/app/store/facade.service";

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
    RouterLink,
    RouterLinkActive,
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
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  readonly #destroyRef: DestroyRef = inject(DestroyRef);

  readonly colorModes = [
    { name: "light", text: "Light", icon: "cilSun" },
    { name: "dark", text: "Dark", icon: "cilMoon" },
    { name: "auto", text: "Auto", icon: "cilContrast" },
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return (
      this.colorModes.find((mode) => mode.name === currentMode)?.icon ??
      "cilSun"
    );
  });

  constructor(private _authFacade: AuthFacadeService) {
    super();
    this.user$ = this._authFacade.user$;
  }
}
