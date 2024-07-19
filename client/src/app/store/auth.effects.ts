import { SessionService } from "../services/sessionService.service";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { mergeMap, catchError, switchMap, map } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { AuthActions } from "./auth.actions";
import { IChannel } from "../interfaces/IChannel.interface";
import { IStatus, StatusState } from "../interfaces/IStatus.interface";
import { Router } from "@angular/router";
import { SESSION_VERIFICATION_DATA } from "../constants/localStorage.injectionToken";

@Injectable()
export class AuthEffects {
  public createChannel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createChannel),
      mergeMap(() =>
        from(this.authService.createChannel()).pipe(
          mergeMap((channel: IChannel) => [
            AuthActions.createChannelSuccess({ channel }),
            AuthActions.getStatus({ channelToken: channel.channelToken }),
          ]),
          catchError((error) => of(AuthActions.createChannelError({ error })))
        )
      )
    )
  );

  public getStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getStatus),
      switchMap(({ channelToken }) =>
        from(this.authService.getStatus(channelToken)).pipe(
          mergeMap((status: IStatus) => {
            const completedStatus = status.state === StatusState.completed;
            if (completedStatus) {
              this._sessionService.setItemToLocalStorage(
                SESSION_VERIFICATION_DATA,
                status
              );
              this._router.navigate(["templates"]);
              return this.authService.login(status).pipe(
                mergeMap(( user ) => [
                  AuthActions.getStatusSuccess({ status }),
                  AuthActions.loginSuccess({ user }),
                ]),
                catchError((loginError) => {
                  return of(AuthActions.getStatusError({ error: loginError }));
                })
              );
            } else {
              return [AuthActions.getStatusSuccess({ status })];
            }
          }),
          catchError((error) =>
            of(AuthActions.getStatusError({ error: error }))
          )
        )
      )
    )
  );

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((sessionData) => {
        console.log('--effect--sessionData', sessionData);
        return this.authService.login(sessionData).pipe(
          map(( user ) => AuthActions.loginSuccess({ user })),
          catchError((error) => of(AuthActions.loginError({ error })))
        )
})
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private _sessionService: SessionService,
    private _router: Router
  ) {}
}
