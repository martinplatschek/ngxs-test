import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {GetPartnerId, SetIsLoading} from './appState.actions';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';

export type AppStateModel = {
  isLoading: boolean;
  partnerId: string;
  testForm?: {
    model?: {
      name: string;
      datum: string;
      email: string;
    };
    dirty?: boolean;
    status?: string;
  }
}

@State<AppStateModel>({
  name: 'AppState',
  defaults: {
    isLoading: false,
    partnerId: '123',
    testForm: {
      model: {
        name: 'John Doe 123',
        datum: '2020-12-12',
        email: ''
      }
    }
  },
})
@Injectable()
export class AppState {

  // region selectors
  /**
   * Selectors
   */
  @Selector()
  static isLoading(state: AppStateModel) {
    return state.isLoading;
  }

  @Selector()
  static form(state: AppStateModel) {
    return state.testForm?.model;
  }

  @Selector()
  static partnerId(state: AppStateModel) {
    return state.partnerId;
  }
  // endregion

  constructor(private httpClient: HttpClient) {}

  // region actions
  /**
   * Actions
   */
  @Action(GetPartnerId)
  getPartnerId({patchState}: StateContext<AppStateModel>) {
    return this.httpClient.get<string[]>('https://www.uuidtools.com/api/generate/v1').pipe(
      tap((response: string[]) => {
        patchState({ partnerId: response[0] });
      })
    )
  }

  @Action(SetIsLoading)
  setIsLoading({patchState}: StateContext<AppStateModel>, action: SetIsLoading) {
    patchState({
      isLoading: action.isLoading,
    });
  }
  // endregion
}
