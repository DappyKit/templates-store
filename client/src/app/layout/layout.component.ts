import { SharedModalService } from './../services/sharedModal.service';
import { LoginComponent } from './../views/pages/login/login.component';
import { AfterViewInit } from '@angular/core';
import { SharedModalComponent } from './../shared/components/modal/modal.component';
import { ModalHostDirective } from './../directives/modal-host.directive';
import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from '.';
import { navItems } from './nav';
import { MODAL_ID } from '../constants/modal-id';


@Component({
  selector: 'app-dashboard',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent,
    ModalHostDirective,
    SharedModalComponent,
    LoginComponent
  ]
})
export class LayoutComponent implements AfterViewInit {
  public navItems = navItems;

  @ViewChild(ModalHostDirective, { static: true })
  modalHost!: ModalHostDirective;
  
  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }

  constructor(
    private sharedModalService: SharedModalService
  ) {}

  ngAfterViewInit(): void {
   this.sharedModalService.modalState$.subscribe((next) => {
      if (next && next.id === MODAL_ID.loginComponent && next.show) {
        const viewContainerRef = this.modalHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(LoginComponent);
        componentRef.instance.modalVisible = true;
       if(!next.show){
        componentRef.instance.ngOnDestroy();
       }
      }
    });
  }
  
}