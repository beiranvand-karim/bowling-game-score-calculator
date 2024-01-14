import { Injectable } from '@angular/core'

import { Frame } from '../model/frame.types'
import { FrameService } from './frame.service'

@Injectable()
export class ScoreCalculatorService {
  GAME_LENGTH = 10
  PINS_SET_AS_TARGET_PER_FRAME = 10

  constructor(private readonly frameService: FrameService) {}

  calculateGameLength(frames: Frame[], gameLength: number) {
    const lastFrame = frames[frames.length - 1]
    return frames.length === gameLength && this.isStrikeOrSpare(lastFrame)
      ? gameLength + 1
      : gameLength
  }

  gameIsOnGoing(liveFrameIndicator: number, gameLength: number) {
    return liveFrameIndicator <= gameLength
  }

  identificationForTheFramingBeingPlayed(frames: Frame[]) {
    return frames.length === 0 ? 1 : frames.length + 1
  }

  isStrikeOrSpare(frame: Frame) {
    return this.frameService.isStrike(frame) || this.frameService.isSpare(frame)
  }

  gameHasStarted(frames: Frame[]) {
    return frames.length > 0
  }

  calculateAllFramesScoreWithNextFrameConsideration(frames: Frame[]) {
    return frames.map((targetFrame, index) => ({
      frame: targetFrame,
      score: this.calculateFrameScore(targetFrame, frames[index + 1]),
    }))
  }

  calculateTotalScore(frames: Array<Frame>, gameLength: number) {
    return frames.reduce((accumulator, targetFrame, index) => {
      const nextFrame = frames[index + 1]
      const isPrizeFrame = index === gameLength

      if (isPrizeFrame) {
        return accumulator
      }

      const sum = this.calculateFrameScore(targetFrame, nextFrame)

      return accumulator + sum
    }, 0)
  }

  public calculateFrameScore(frame: Frame, followingFrame: Frame) {
    return followingFrame
      ? this.frameService.isStrike(frame)
        ? this.PINS_SET_AS_TARGET_PER_FRAME +
          this.frameService.pinsKnockedDownInFrame(followingFrame)
        : this.frameService.isSpare(frame)
        ? this.PINS_SET_AS_TARGET_PER_FRAME + followingFrame.first
        : this.frameService.pinsKnockedDownInFrame(frame)
      : this.frameService.pinsKnockedDownInFrame(frame)
  }
}
