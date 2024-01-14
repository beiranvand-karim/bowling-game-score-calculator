import { Component, Input } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { map, Observable, switchMap } from 'rxjs'

import { AppState, ScoreCalculatorService } from '../../domain'
import { framesSelector, removeAllFrames } from '../../state'
import { GameSettingsSelectors } from '../../state/selectors/game-settings.state.selectors'

@Component({
  selector: 'app-frame-hits-form-card',
  templateUrl: './frame-hits-form-card.component.html',
  styleUrls: ['./frame-hits-form-card.component.scss'],
})
export class FrameHitsFormCardComponent {
  @Input()
  allPlayedFramesScore: number

  liveFrameIndicator$: Observable<number>
  gameIsOnGoing$: Observable<boolean>
  gameLength$: Observable<number>

  constructor(
    private readonly store: Store<AppState>,
    private readonly scoreCalculatorService: ScoreCalculatorService
  ) {
    const framesFromStore = this.store.pipe(select(framesSelector))

    this.gameLength$ = framesFromStore.pipe(
      switchMap(frames =>
        this.store
          .select(GameSettingsSelectors.gameLength)
          .pipe(
            map(gameLength =>
              this.scoreCalculatorService.calculateGameLength(
                frames,
                gameLength
              )
            )
          )
      )
    )

    this.liveFrameIndicator$ = framesFromStore.pipe(
      map(frames =>
        this.scoreCalculatorService.identificationForTheFramingBeingPlayed(
          frames
        )
      )
    )

    this.gameIsOnGoing$ = this.liveFrameIndicator$.pipe(
      switchMap(liveFrameIndicator =>
        this.gameLength$.pipe(
          map(gameLength =>
            this.scoreCalculatorService.gameIsOnGoing(
              liveFrameIndicator,
              gameLength
            )
          )
        )
      )
    )
  }
  public restGame() {
    this.store.dispatch(removeAllFrames())
  }
}
