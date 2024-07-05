import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthFacadeService } from "./../store/facade.service";
import { SessionService } from "./../services/sessionService.service";
import { filter, map, take } from "rxjs/operators";
import { SESSION_VERIFICATION_DATA } from "../constants/localStorage.injectionToken";

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
    authFacadeService.verifyMessage(sessionData);
    return authFacadeService.isLoggedIn$.pipe(
      filter((isLoggedIn) => isLoggedIn !== null),
      take(1),
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          router.navigate(["login"]);
          return false;
        }
        return true;
      })
    );
  }
};
