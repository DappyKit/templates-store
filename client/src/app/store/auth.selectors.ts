import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from "@ngrx/store";
import { AuthState } from "./auth.reducer";
import { IChannel } from "../interfaces/IChannel.interface";
import { IUser } from "../interfaces/IUser.interface";

// Create a feature selector for AuthState
export const selectAuthState: MemoizedSelector<object, AuthState> =
  createFeatureSelector<AuthState>("auth");

// Selector to get the channel from AuthState
export const selectChannel: MemoizedSelector<object, IChannel | null> =
  createSelector(selectAuthState, (state: AuthState) => state.channel);

// Selector to get the QR code from the channel
export const selectQRcode: MemoizedSelector<object, string | null> =
  createSelector(
    selectChannel,
    (channel: IChannel | null) => channel?.connectUri ?? null
  );
export const isLoggedIn: MemoizedSelector<object, boolean | null> = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoggedIn
);

export const user: MemoizedSelector<object, IUser | null> = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
