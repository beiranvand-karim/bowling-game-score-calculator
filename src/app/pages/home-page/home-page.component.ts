import { Component } from '@angular/core'
import { map, Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import { AppState, ScoreCalculatorService } from '../../declarations'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  allPlayedFramesScore: Observable<number>

  constructor(
    private store: Store<AppState>,
    private scoreCalculatorService: ScoreCalculatorService
  ) {
    this.allPlayedFramesScore = this.store
      .select(state => state.frames)
      .pipe(
        map(frames => this.scoreCalculatorService.calculateTotalScore(frames))
      )
  }
}
