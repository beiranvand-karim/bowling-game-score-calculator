export interface Frame {
  first: number
  second: number
}

export interface FrameReducerAction {
  type: string
  payload?: Frame
}

export interface AppState {
  readonly frames: Frame[]
}
