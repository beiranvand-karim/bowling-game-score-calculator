import { select, Store } from '@ngrx/store'
import { Component } from '@angular/core'
import { map, Observable } from 'rxjs'

import { AppState, ScoreCalculatorService } from '../../domain'
import { framesSelector } from '../../state'

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
    this.allPlayedFramesScore = this.store.pipe(
      select(framesSelector),
      map(frames => this.scoreCalculatorService.calculateTotalScore(frames))
    )
  }
}
