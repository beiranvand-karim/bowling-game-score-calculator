import { GameSettingsNetworkModel } from '../../network/model/game-settings.network.models'

export interface GameSettingsStateModel {
  gameSettings: GameSettingsNetworkModel | undefined
}
