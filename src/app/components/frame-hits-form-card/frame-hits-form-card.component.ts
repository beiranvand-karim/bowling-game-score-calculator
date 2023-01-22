import { Component, Input } from '@angular/core'
import { map, Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import { AppState, ScoreCalculatorService } from '../../declarations'
import { REMOVE_ALL_FRAMES } from '../../reducers'

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
    this.store
      .select(state => state.frames)
      .pipe(map(frames => frames.length + 1))
      .subscribe(framesCount => (this.liveFrameIndicator = framesCount))

    this.store
      .select(state => state.frames)
      .subscribe(frames => {
        const lastFrame = frames[frames.length - 1]

        this.GAME_LENGTH =
          frames.length === this.scoreCalculatorService.GAME_LENGTH &&
          this.scoreCalculatorService.isStrikeOrSpare(lastFrame)
            ? this.scoreCalculatorService.GAME_LENGTH + 1
            : this.scoreCalculatorService.GAME_LENGTH
      })
  }
  public restGame() {
    this.store.dispatch({
      type: REMOVE_ALL_FRAMES,
    })
  }
}
