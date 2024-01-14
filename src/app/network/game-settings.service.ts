import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { GameSettingsNetworkModel } from './model/game-settings.network.models'

@Injectable()
export class GameSettingsService {
  constructor(private readonly httpClient: HttpClient) {}

  get() {
    return this.httpClient.get<GameSettingsNetworkModel>(
      'assets/game-settings.json'
    )
  }
}
