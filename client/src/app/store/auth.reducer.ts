
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { IStatus } from '../interfaces/IStatus.interface';
import { IUser } from '../interfaces/IUser.interface';
import { IChannel } from '../interfaces/IChannel.interface';

export interface AuthState {
  channel: IChannel | null;
  user: IUser | null;
  status: IStatus | null;
}

export const initialState: AuthState = {
  channel: null,
  user: null,
  status: null,
};

export const authReducer = createReducer<AuthState>(
  initialState,
  on(AuthActions.createChannel, (state) => ({
    ...state,
    channel: null,
  })),
  on(AuthActions.createChannelSuccess, (state, { channel }) => ({
    ...state,
    channel,
  })),
  on(AuthActions.createChannelError, (state, { error }) => ({
    ...state,
    // Handle error
  })),
  on(AuthActions.getStatus, (state) => ({
    ...state,
  })),
  on(AuthActions.getStatusSuccess, (state, { status }) => ({
    ...state,
    status,
  })),
  on(AuthActions.getStatusError, (state, { error }) => ({
    ...state,
    // Handle error
  })),
  on(AuthActions.login, (state) => ({
    ...state
  })),
  on(AuthActions.loginSuccess, (state, { user }) => {
    return ({
    ...state,
    user,
  })}),
  on(AuthActions.loginError, (state, { error }) => ({
    ...state,
    // Handle error
  }))
);
