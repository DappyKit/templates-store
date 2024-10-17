import { SessionService } from "../services/sessionService.service";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { catchError, switchMap, map, tap } from "rxjs/operators";

import { AuthActions } from "./auth.actions";
import { IChannel } from "../interfaces/IChannel.interface";
import { IStatus, StatusState } from "../interfaces/IStatus.interface";
import { Router } from "@angular/router";
import { SESSION_VERIFICATION_DATA } from "../constants/localStorage.injectionToken";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private _sessionService = inject(SessionService);
  private _router = inject(Router);

  public createChannel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.createChannel),
      switchMap(() =>
        from(this.authService.createChannel()).pipe(
          switchMap((channel: IChannel) => [
            AuthActions.createChannelSuccess({ channel }),
            AuthActions.getStatus({ channelToken: channel.channelToken }),
          ]),
          catchError((error: Error) => of(AuthActions.createChannelError({ error })))
        )
      )
    )
  
});

  public getStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getStatus),
      switchMap(({ channelToken }) =>
        from(this.authService.getStatus(channelToken)).pipe(
          switchMap((status: IStatus) => {
            const completedStatus = status.state === StatusState.completed;
            if (completedStatus) {
              this._sessionService.setItemToLocalStorage(
                SESSION_VERIFICATION_DATA,
                status
              );
              this._router.navigate(["templates"]);
            }
            return of(AuthActions.getStatusSuccess({ status }));
          }),
          catchError((error) => of(AuthActions.getStatusError({ error })))
        )
      )
    )
  );

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ sessionData }) => {
        return from(this.authService.login(sessionData)).pipe( // Use `from` if `login` returns a Promise
          map((user) => AuthActions.loginSuccess({ user })),
          catchError((error) => of(AuthActions.loginError({ error })))
        );
      })
    )
  );
}
