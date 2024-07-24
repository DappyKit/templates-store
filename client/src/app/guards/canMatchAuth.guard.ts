import { MODAL_ID } from './../constants/modal-id';
import { inject } from "@angular/core";
import { CanMatchFn } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthFacadeService } from "./../store/facade.service";
import { SessionService } from "./../services/sessionService.service";
import { filter, map, take } from "rxjs/operators";
import { SESSION_VERIFICATION_DATA } from "../constants/localStorage.injectionToken";
import { IStatus } from "../interfaces/IStatus.interface";
import { SharedModalService } from '../services/sharedModal.service';

export const canMatchGuard: CanMatchFn = (): Observable<boolean> => {
  const sessionService = inject(SessionService);
  const authFacadeService = inject(AuthFacadeService);
  const modalService = inject(SharedModalService);

  const sessionData: IStatus = sessionService.getItemFromLocalStorage(
    SESSION_VERIFICATION_DATA
  );

  if (!sessionData) {
    modalService.toggle({ show: true, id: MODAL_ID.loginComponent });
    return of(false);
  } else {
    authFacadeService.login(sessionData);
    return authFacadeService.user$.pipe(
      filter((user) => user !== null),
      take(1),
      map(() =>   {
        modalService.toggle({ show: false, id: MODAL_ID.loginComponent });
        return true;
        }
      )
    );
  }
};
