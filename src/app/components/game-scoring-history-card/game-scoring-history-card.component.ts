import { Component, Input } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import {
  AppState,
  GameHistoryTableIncomingDataFormat,
  ScoreCalculatorService,
} from '../../declarations'

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
    this.store
      .select(state => state.frames)
      .subscribe(frames => {
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
