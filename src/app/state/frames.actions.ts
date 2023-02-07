import { createAction, props } from '@ngrx/store'

import { Frame } from '../declarations'

export const addFrame = createAction('add frame', props<Frame>())
export const removeAllFrames = createAction('remove all frames')
