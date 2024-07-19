import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IChannel } from '../interfaces/IChannel.interface';
import { IStatus } from '../interfaces/IStatus.interface';
import { IUser } from '../interfaces/IUser.interface';



export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Create Channel': emptyProps(),
    'Create Channel Success': props<{ channel: IChannel }>(),
    'Create Channel Error': props<{ error: Error }>(),
    'Get Status': props<{ channelToken: string }>(),
    'Get Status Success': props<{ status: IStatus }>(),
    'Get Status Error': props<{ error: Error }>(),
    'Login':  props<{ sessionData: IStatus }>(),
    'Login Success': props<{  user: IUser }>(),
    'Login Error': props<{ error: Error }>(),
  },
});

