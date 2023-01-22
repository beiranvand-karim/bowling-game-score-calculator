import { Injectable } from '@angular/core'

import { Frame } from './frame.types'

@Injectable({
  providedIn: 'root',
})
export class ScoreCalculatorService {
  GAME_LENGTH = 10
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

  isStrikeOrSpare(frame: Frame) {
    return this.isStrike(frame) || this.isSpare(frame)
  }

  pinsKnockedDownInFrame(frame: Frame) {
    return frame.first + frame.second
  }

  calculateTotalScore(frames: Array<Frame>) {
    return frames.reduce((accumulator, targetFrame, index) => {
      const nextFrame = frames[index + 1]
      const isPrizeFrame = index === this.GAME_LENGTH

      if (isPrizeFrame) {
        return accumulator
      }

      const sum = this.calculateFrameScore(targetFrame, nextFrame)

      return accumulator + sum
    }, 0)
  }

  public calculateFrameScore(frame: Frame, followingFrame: Frame) {
    return followingFrame
      ? this.isStrike(frame)
        ? this.PINS_SET_AS_TARGET_PER_FRAME +
          this.pinsKnockedDownInFrame(followingFrame)
        : this.isSpare(frame)
        ? this.PINS_SET_AS_TARGET_PER_FRAME + followingFrame.first
        : this.pinsKnockedDownInFrame(frame)
      : this.pinsKnockedDownInFrame(frame)
  }
}
