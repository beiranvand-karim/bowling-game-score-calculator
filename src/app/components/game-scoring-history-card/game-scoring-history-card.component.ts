import { Component, Input } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import {
  AppState,
  ScoreCalculatorService,
  GameHistoryTableIncomingDataFormat,
} from '../../declarations'
import { framesSelector } from '../../state'

@Component({
  selector: 'app-game-scoring-history-card',
  templateUrl: './game-scoring-history-card.component.html',
  styleUrls: ['./game-scoring-history-card.component.scss'],
})
export class GameScoringHistoryCardComponent {
  scoringHistoryData: GameHistoryTableIncomingDataFormat[] = []

  @Input()
  allPlayedFramesScore: Observable<number>

  constructor(
    private store: Store<AppState>,
    private scoreCalculatorService: ScoreCalculatorService
  ) {
    this.store.pipe(select(framesSelector)).subscribe(frames => {
      this.scoringHistoryData = frames.map((targetFrame, index) => ({
        frame: targetFrame,
        score: this.scoreCalculatorService.calculateFrameScore(
          targetFrame,
          frames[index + 1]
        ),
      }))
    })
  }
}
