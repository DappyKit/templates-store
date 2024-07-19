// constants/localStorage.injectionToken.ts
import { InjectionToken } from '@angular/core';

export const SESSION_VERIFICATION_DATA = "sessionVerificationData";

export const LOCAL_STORAGE = new InjectionToken<Storage>('LocalStorageToken', {
  providedIn: 'root',
  factory: () => localStorage,
});
