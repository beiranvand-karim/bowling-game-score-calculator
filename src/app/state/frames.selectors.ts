import { AppState, Frame } from '../declarations'

import { createSelector } from '@ngrx/store'

const selectFrames = (state: AppState) => state.frames
export const framesSelector = createSelector(
  selectFrames,
  (state: Frame[]) => state
)
