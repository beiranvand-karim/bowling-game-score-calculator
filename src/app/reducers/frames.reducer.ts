import { FrameReducerAction, Frame } from '../declarations'

export const ADD_FRAME = 'ADD_FRAME'
export const REMOVE_ALL_FRAMES = 'REMOVE_ALL_FRAMES'

export function framesReducer(state: Frame[] = [], action: FrameReducerAction) {
  return action.type === ADD_FRAME
    ? [...state, action.payload]
    : action.type === REMOVE_ALL_FRAMES
    ? []
    : state
}
