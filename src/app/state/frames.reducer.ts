import { createReducer, on } from '@ngrx/store'

import { addFrame, removeAllFrames } from './frames.actions'
import { Frame } from '../declarations'

export const initialState: ReadonlyArray<Frame> = []

export const framesReducer = createReducer(
  initialState,
  on(addFrame, (state, frame) => [...state, frame]),
  on(removeAllFrames, () => [])
)
