import { GameSettingsStateModel } from '../models/game-settings.state.models'
import { Action, createReducer, on } from '@ngrx/store'
import { GameSettingsStateActions } from '../actions/game-settings.state.actions'

const initialState: GameSettingsStateModel = {
  gameSettings: undefined,
}

const reducerFactory = createReducer<GameSettingsStateModel>(
  initialState,
  on(GameSettingsStateActions.putInStore, (state, { payload }) => ({
    ...state,
    gameSettings: payload,
  }))
)

export function gameSettingsReducer(
  state: GameSettingsStateModel,
  action: Action
): GameSettingsStateModel {
  return reducerFactory(state, action)
}
