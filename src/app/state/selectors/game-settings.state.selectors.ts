import { createFeatureSelector, createSelector } from '@ngrx/store'
import { GameSettingsStateModel } from '../models/game-settings.state.models'

const gameSettingsFeature =
  createFeatureSelector<GameSettingsStateModel>('gameSettings')

export const gameSettings = createSelector(
  gameSettingsFeature,
  state => state.gameSettings
)

export const gameLength = createSelector(
  gameSettingsFeature,
  state => state.gameSettings?.GameLength
)

export const GameSettingsSelectors = {
  self: gameSettings,
  gameLength,
}
