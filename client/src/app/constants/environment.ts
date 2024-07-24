import { InjectionToken } from '@angular/core';
import { environment } from "./../../environments/environment";

export const ENVIRONMENT = new InjectionToken<any>('environment',{
    providedIn: 'root',
    factory: () => environment
});
