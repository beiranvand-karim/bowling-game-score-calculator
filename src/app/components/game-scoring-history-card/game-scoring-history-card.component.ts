import { Component, Input } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import {
  AppState,
  ScoreCalculatorService,
  GameHistoryTableIncomingDataFormat,
} from '../../domain'
import { framesSelector } from '../../state'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-game-scoring-history-card',
  templateUrl: './game-scoring-history-card.component.html',
  styleUrls: ['./game-scoring-history-card.component.scss'],
})
export class GameScoringHistoryCardComponent {
  @Input()
  allPlayedFramesScore: number

  scoringHistoryData$: Observable<GameHistoryTableIncomingDataFormat[]>
  gameHasStarted$: Observable<boolean>

  constructor(
    private readonly store: Store<AppState>,
    private readonly scoreCalculatorService: ScoreCalculatorService
  ) {
    this.gameHasStarted$ = this.store.pipe(
      select(framesSelector),
      map(this.scoreCalculatorService.gameHasStarted)
    )
    this.scoringHistoryData$ = this.store.pipe(
      select(framesSelector),
      map(frames =>
        this.scoreCalculatorService.calculateAllFramesScoreWithNextFrameConsideration(
          frames
        )
      )
    )
  }
}
