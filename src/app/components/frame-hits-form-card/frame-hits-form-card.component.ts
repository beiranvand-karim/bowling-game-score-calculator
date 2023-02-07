import { Component, Input } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { map, Observable } from 'rxjs'

import { AppState, ScoreCalculatorService } from '../../declarations'
import { framesSelector, removeAllFrames } from '../../state'

@Component({
  selector: 'app-frame-hits-form-card',
  templateUrl: './frame-hits-form-card.component.html',
  styleUrls: ['./frame-hits-form-card.component.scss'],
})
export class FrameHitsFormCardComponent {
  liveFrameIndicator = 1
  GAME_LENGTH = this.scoreCalculatorService.GAME_LENGTH

  @Input()
  allPlayedFramesScore: Observable<number>

  constructor(
    private store: Store<AppState>,
    private scoreCalculatorService: ScoreCalculatorService
  ) {
    const framesFromStore = this.store.pipe(select(framesSelector))

    framesFromStore
      .pipe(map(frames => frames.length + 1))
      .subscribe(framesCount => (this.liveFrameIndicator = framesCount))

    framesFromStore.subscribe(frames => {
      const lastFrame = frames[frames.length - 1]

      this.GAME_LENGTH =
        frames.length === this.scoreCalculatorService.GAME_LENGTH &&
        this.scoreCalculatorService.isStrikeOrSpare(lastFrame)
          ? this.scoreCalculatorService.GAME_LENGTH + 1
          : this.scoreCalculatorService.GAME_LENGTH
    })
  }
  public restGame() {
    this.store.dispatch(removeAllFrames())
  }
}
