import { createAction, props } from '@ngrx/store'
import { GameSettingsNetworkModel } from '../../network/model/game-settings.network.models'

export const GameSettingsStateActions = {
  get: createAction('[ game settings] get'),
  putInStore: createAction(
    '[game settings] put in store',
    props<{ payload: GameSettingsNetworkModel }>()
  ),
}
