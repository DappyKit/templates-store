import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects'
import { provideState, provideStore } from '@ngrx/store';
import { AuthEffects } from './store/auth.effects';
import { authReducer } from './store/auth.reducer';
import { environment } from 'src/environments/environment';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withRouterConfig({
        onSameUrlNavigation: 'reload'
    }), withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
    }), withEnabledBlockingInitialNavigation(), withViewTransitions(), withHashLocation()),
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimations(),
    provideStore(),
    provideEffects(AuthEffects),
    provideState({ name: 'auth', reducer: authReducer }),
    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production, // Restrict extension to log-only mode in production
      })
    )
]
};
