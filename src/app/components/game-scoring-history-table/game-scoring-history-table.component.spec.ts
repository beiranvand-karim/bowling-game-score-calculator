import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatTableModule } from '@angular/material/table'
import { By } from '@angular/platform-browser'

import { GameScoringHistoryTableComponent } from './game-scoring-history-table.component'
import { provideMockStore } from '@ngrx/store/testing'

describe('GameScoringHistoryTableComponent', () => {
  let component: GameScoringHistoryTableComponent
  let fixture: ComponentFixture<GameScoringHistoryTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameScoringHistoryTableComponent],
      imports: [MatTableModule],
      providers: [provideMockStore()],
      schemas: [],
    }).compileComponents()

    fixture = TestBed.createComponent(GameScoringHistoryTableComponent)
    component = fixture.componentInstance
  })

  it('should visualize a received frame', () => {
    fixture.componentInstance.dataSource = [
      { frame: { first: 1, second: 2 }, score: 3 },
    ]
    fixture.detectChanges()

    const selectByTestId = identifier =>
      fixture.debugElement.query(By.css(`[data-test-id="${identifier}"]`))
        .nativeElement.textContent

    expect(selectByTestId('first')).toContain('1')
    expect(selectByTestId('second')).toContain('2')
    expect(selectByTestId('score')).toContain('3')
  })
})
