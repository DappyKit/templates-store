import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthFacadeService } from "./../store/facade.service";
import { SessionService } from "./../services/sessionService.service";
import { filter, map, take } from "rxjs/operators";
import { SESSION_VERIFICATION_DATA } from "../constants/localStorage.injectionToken";
import { IUser } from "../interfaces/IUser.interface";

export const canMatchGuard: CanMatchFn = (): Observable<boolean> | boolean => {
  const sessionService = inject(SessionService);
  const authFacadeService = inject(AuthFacadeService);
  const router = inject(Router);

  const sessionData = sessionService.getItemFromLocalStorage(
    SESSION_VERIFICATION_DATA
  );

  if (!sessionData) {
    router.navigate(["login"]);
    return false;
  } else {
    authFacadeService.login(sessionData);
    return authFacadeService.user$.pipe(
      filter((user) => user !== null),
      take(1),
      map((user: IUser | null) => {
        if (!user) {
          router.navigate(["login"]);
          return false;
        }
        return true;
      })
    );
  }
};
