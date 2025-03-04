import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideStore, Store} from '@ngxs/store';
import {AppState} from './store/appState';
import {withNgxsReduxDevtoolsPlugin} from '@ngxs/devtools-plugin';
import {withNgxsFormPlugin} from '@ngxs/form-plugin';
import {GetPartnerId, SetIsLoading} from './store/appState.actions';
import {provideHttpClient} from '@angular/common/http';
import {mergeMap} from 'rxjs';
import {provideEnvironmentNgxMask} from 'ngx-mask';

const appInit = (store: Store) => {
  return store.dispatch(new GetPartnerId());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(
      [AppState],
      withNgxsReduxDevtoolsPlugin(),
      withNgxsFormPlugin()
    ),
    provideAppInitializer(() => appInit(inject(Store))),
    provideEnvironmentNgxMask()
  ]
};
