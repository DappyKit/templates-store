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

  public toggle(action: any) {
    this.modalService.toggle(action);
    this.modalStateSubject.next(action);
  }
}
