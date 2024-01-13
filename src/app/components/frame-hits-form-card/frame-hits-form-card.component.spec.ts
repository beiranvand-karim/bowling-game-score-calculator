import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { MatCardModule } from '@angular/material/card'
import { By } from '@angular/platform-browser'
import { MockComponent } from 'ng-mocks'

import { FrameHitsFormCardComponent } from './frame-hits-form-card.component'
import { AppState, Frame, ScoreCalculatorService } from '../../domain'
import { FramePerformanceReceivingFormComponent } from '..'
import { framesSelector, initialState } from '../../state'

describe('FrameHitsFormCardComponent', () => {
  let component: FrameHitsFormCardComponent
  let fixture: ComponentFixture<FrameHitsFormCardComponent>
  let store: MockStore<AppState>
  let mockFramesSelector

  const frame: Frame = { first: 1, second: 1 }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FrameHitsFormCardComponent,
        MockComponent(FramePerformanceReceivingFormComponent),
      ],
      providers: [
        ScoreCalculatorService,
        provideMockStore({ initialState: { frames: initialState } }),
      ],
      imports: [MatCardModule],
    }).compileComponents()

    fixture = TestBed.createComponent(FrameHitsFormCardComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore)
    mockFramesSelector = store.overrideSelector(
      framesSelector,
      Array(5).fill(frame)
    )
    store.refreshState()
    fixture.detectChanges()
  })

  afterEach(() => {
    store?.resetSelectors()
  })

  it('should visualize live frame indicator', () => {
    mockFramesSelector.setResult(Array(3).fill(frame))
    store.refreshState()
    fixture.detectChanges()

    const frameRenderedData = fixture.debugElement.query(
      By.css('.mat-mdc-card-subtitle')
    ).nativeElement.innerText

    expect(frameRenderedData).toContain(4)
  })

  it('should visualize game length', () => {
    store.setState({ frames: Array(3).fill(frame) })
    fixture.detectChanges()

    const frameRenderedData = fixture.debugElement.query(
      By.css('.mat-mdc-card-subtitle')
    ).nativeElement.innerText

    // improvement, no need to hard code outcome below, 10, if score calculating service is mocked partially
    expect(frameRenderedData).toContain(10)
  })

  it('should hide active frame index when game finishes', () => {
    mockFramesSelector.setResult(Array(10).fill(frame))
    store.refreshState()
    fixture.detectChanges()

    const frameRenderedData = fixture.debugElement.query(
      By.css('.mat-mdc-card-subtitle')
    ).nativeElement.innerText

    expect(frameRenderedData).toContain('scores ...')
  })
})
