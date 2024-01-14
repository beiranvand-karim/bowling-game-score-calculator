import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { GameSettingsStateActions } from '../actions/game-settings.state.actions'
import { switchMap, map, catchError } from 'rxjs/operators'
import { GameSettingsService } from '../../network/game-settings.service'
import { EMPTY } from 'rxjs'

@Injectable()
export class GameSettingsStateEffects {
  get$ = createEffect(() =>
    this.actions.pipe(
      ofType(GameSettingsStateActions.get),
      switchMap(() =>
        this.gameSettingsService.get().pipe(
          map(
            value => GameSettingsStateActions.putInStore({ payload: value }),
            catchError(() => EMPTY)
          )
        )
      )
    )
  )

  constructor(
    private readonly actions: Actions,
    private readonly gameSettingsService: GameSettingsService
  ) {}
}
