import { select, Store } from '@ngrx/store'
import { Component, OnInit } from '@angular/core'
import { map, switchMap } from 'rxjs/operators'

import { AppState, ScoreCalculatorService } from '../../domain'
import { framesSelector } from '../../state'
import { GameSettingsStateActions } from '../../state/actions/game-settings.state.actions'
import {
  gameLength,
  GameSettingsSelectors,
} from '../../state/selectors/game-settings.state.selectors'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  allPlayedFramesScore: Observable<number>

  constructor(
    private readonly store: Store<AppState>,
    private readonly scoreCalculatorService: ScoreCalculatorService
  ) {
    this.allPlayedFramesScore = this.store.pipe(
      select(framesSelector),
      switchMap(frames =>
        this.store
          .select(GameSettingsSelectors.gameLength)
          .pipe(
            map(gameLength =>
              this.scoreCalculatorService.calculateTotalScore(
                frames,
                gameLength
              )
            )
          )
      )
    )
  }

  ngOnInit(): void {
    this.store.dispatch(GameSettingsStateActions.get())
  }
}
