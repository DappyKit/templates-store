import { IModalAction } from '@coreui/angular/lib/modal/modal.service';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ModalService } from "@coreui/angular";

@Injectable({
  providedIn: "root",
})
export class SharedModalService {
  private modalStateSubject = new BehaviorSubject<any>(null);
  public modalState$ = this.modalStateSubject.asObservable();

  constructor(private modalService: ModalService) {}

  public toggle(action: IModalAction) {
    this.modalService.toggle(action);
    this.modalStateSubject.next(action);
  }
}
