import { IUser } from 'src/app/interfaces/IUser.interface';
import { IChannel } from 'src/app/interfaces/IChannel.interface';
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { IStatus } from '../interfaces/IStatus.interface';

export interface AuthState {
  channel: IChannel | null;
  user: IUser | null;
  status: IStatus | null;
  isLoggedIn: null | boolean;
}

export const initialState: AuthState = {
  channel: null,
  user: null,
  status: null,
  isLoggedIn: null,
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
    // Optionally clear status or any other state if needed
  })),
  on(AuthActions.getStatusSuccess, (state, { status }) => ({
    ...state,
    status,
  })),
  on(AuthActions.getStatusError, (state, { error }) => ({
    ...state,
    // Handle error
  })),
  on(AuthActions.setUser, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.verifySignIn, (state) => ({
    ...state
  })),
  on(AuthActions.verifySignInSuccess, (state, { isLoggedIn }) => {
    return ({
    ...state,
    isLoggedIn,
  })}),
  on(AuthActions.verifySignInError, (state, { error }) => ({
    ...state,
    // Handle error
  }))
);
