import { selectChannel, selectQRcode, user } from './auth.selectors';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { AuthActions } from './auth.actions';
import { Observable } from 'rxjs';
import { IChannel } from '../interfaces/IChannel.interface';
import { IUser } from '../interfaces/IUser.interface';



@Injectable({
    providedIn: 'root'
})
export class AuthFacadeService {

  public selectQRcode$: Observable<string | null> = this.store.select(selectQRcode);
  public channel$: Observable<IChannel | null> = this.store.select(selectChannel);
  public user$: Observable<IUser | null> = this.store.select(user);

  constructor(private store: Store<AuthState>) {}

  public createChannel(): void {
    this.store.dispatch(AuthActions.createChannel());
  }

  public login(sessionData: any): void {
    this.store.dispatch(AuthActions.login(sessionData))
  }
}