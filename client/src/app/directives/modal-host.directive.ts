import { Directive, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cModalHost]',
  exportAs: 'cModalHost',
  standalone: true,
})
export class ModalHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
