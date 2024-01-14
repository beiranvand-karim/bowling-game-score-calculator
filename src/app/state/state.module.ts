import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { GameSettingsStateEffects } from './effects/game-settings.state.effects'
import { gameSettingsReducer } from './reducers/game-settings.state.reducers'
import { framesReducer } from './frames.reducer'
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      frames: framesReducer,
      gameSettings: gameSettingsReducer,
    }),
    EffectsModule.forRoot([GameSettingsStateEffects]),
  ],
})
export class StateModule {}
