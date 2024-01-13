import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { cold, getTestScheduler } from 'jasmine-marbles'
import { MatCardModule } from '@angular/material/card'
import { By } from '@angular/platform-browser'
import { MockComponent } from 'ng-mocks'

import { GameScoringHistoryTableComponent } from '../game-scoring-history-table/game-scoring-history-table.component'
import { GameScoringHistoryCardComponent } from './game-scoring-history-card.component'
import { AppState, ScoreCalculatorService } from '../../domain'
import { framesSelector } from '../../state'

describe('GameScoringHistoryCardComponent', () => {
  let component: GameScoringHistoryCardComponent
  let fixture: ComponentFixture<GameScoringHistoryCardComponent>
  let store: MockStore<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameScoringHistoryCardComponent,
        MockComponent(GameScoringHistoryTableComponent),
      ],
      imports: [MatCardModule],
      providers: [ScoreCalculatorService, provideMockStore()],
    }).compileComponents()

    fixture = TestBed.createComponent(GameScoringHistoryCardComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore)
    fixture.detectChanges()
  })

  it('should visualize total score', () => {
    // improvement, could be moved to a global place, because of recurring use
    const selectByTestId = identifier =>
      fixture.debugElement.query(By.css(`[data-test-id="${identifier}"]`))
        .nativeElement.textContent

    const totalScore = 12

    component.allPlayedFramesScore = cold('x|', {
      x: totalScore,
    })

    fixture.detectChanges()
    getTestScheduler().flush()
    fixture.detectChanges()

    expect(selectByTestId('total-score')).toContain(totalScore)
  })

  it('should receive data from store', () => {
    const frame = { first: 1, second: 1 }

    store.overrideSelector(framesSelector, [frame])

    store.refreshState()

    expect(component.scoringHistoryData).toEqual([
      {
        score: 2,
        frame,
      },
    ])
  })
})
