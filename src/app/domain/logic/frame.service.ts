import { Injectable } from '@angular/core'
import { Frame } from '../model/frame.types'

@Injectable()
export class FrameService {
  PINS_SET_AS_TARGET_PER_FRAME = 10

  isStrike(frame: Frame) {
    return (
      frame.first === this.PINS_SET_AS_TARGET_PER_FRAME && frame.second === 0
    )
  }

  isSpare(frame: Frame) {
    return (
      frame.first + frame.second === this.PINS_SET_AS_TARGET_PER_FRAME &&
      frame.first < this.PINS_SET_AS_TARGET_PER_FRAME &&
      frame.second < this.PINS_SET_AS_TARGET_PER_FRAME
    )
  }

  pinsKnockedDownInFrame(frame: Frame) {
    return frame.first + frame.second
  }

  constructor() {}
}
