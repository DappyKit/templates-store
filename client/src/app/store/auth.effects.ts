import { SessionService } from "../services/sessionService.service";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import {
  mergeMap,
  catchError,
  switchMap,
} from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { AuthActions } from "./auth.actions";
import { IChannel } from "../interfaces/IChannel.interface";
import { IStatus, StatusState } from "../interfaces/IStatus.interface";
import { User } from "../interfaces/IUser.interface";
import { Router } from "@angular/router";
import {
  FARCASTER_USER,
  SESSION_VERIFICATION_DATA,
} from "../constants/localStorage.injectionToken";

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
              const user = new User(status);
              this._sessionService.setItemToLocalStorage(
                SESSION_VERIFICATION_DATA,
                status
              );
              this._sessionService.setItemToLocalStorage(FARCASTER_USER, user);
              this._router.navigate(['templates']);

              return this.authService.login(status).pipe(
                mergeMap(() => [
                  AuthActions.getStatusSuccess({ status }),
                  AuthActions.setUser({ user }),
                  AuthActions.verifySignInSuccess({
                    isLoggedIn: completedStatus,
                  }),
                ]),
                catchError((loginError) => {
                  console.error('Login error:', loginError);
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

  public verifyMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.verifySignIn),
      switchMap((sessionData) =>
        from(this.authService.verifySignInMessage(sessionData)).pipe(
          mergeMap((isLoggedIn: boolean) => {
            const user = this._sessionService.getItemFromLocalStorage(FARCASTER_USER);
            if (user) {
              return [
                AuthActions.setUser({ user }),
                AuthActions.verifySignInSuccess({ isLoggedIn })
              ];
            } else {
              return [
                AuthActions.verifySignInSuccess({ isLoggedIn })
              ];
            }
          }),
          catchError((error) => of(AuthActions.verifySignInError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private _sessionService: SessionService,
    private _router: Router
  ) {}
}
