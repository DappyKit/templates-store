import { selectChannel, selectQRcode, user } from './auth.selectors';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { AuthActions } from './auth.actions';
import { Observable } from 'rxjs';
import { IChannel } from '../interfaces/IChannel.interface';
import { IUser } from '../interfaces/IUser.interface';
import { IStatus } from '../interfaces/IStatus.interface';


@Injectable({
    providedIn: 'root'
})
export class AuthFacadeService {

  public selectQRcode$: Observable<string | null>;
  public channel$: Observable<IChannel | null>;
  public user$: Observable<IUser | null>;

  constructor(private store: Store<AuthState>) {
    this.selectQRcode$ = this.store.select(selectQRcode);
    this.channel$ = this.store.select(selectChannel);
    this.user$ = this.store.select(user);
  }

  public createChannel(): void {
    this.store.dispatch(AuthActions.createChannel());
  }

  public login(sessionData: IStatus): void {
    this.store.dispatch(AuthActions.login({sessionData}))
  }
}