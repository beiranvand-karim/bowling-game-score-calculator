import { Component } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { Store } from '@ngrx/store'

import { AppState, Frame, ScoreCalculatorService } from '../../declarations'
import { ADD_FRAME, REMOVE_ALL_FRAMES } from '../../reducers'

@Component({
  selector: 'app-frame-performance-receiving-form',
  templateUrl: './frame-performance-receiving-form.component.html',
  styleUrls: ['./frame-performance-receiving-form.component.scss'],
})
export class FramePerformanceReceivingFormComponent {
  form: FormGroup
  firstRollInputControl: AbstractControl<any, any> | null
  secondRollInputControl: AbstractControl<any, any> | null

  PINS_SET_AS_TARGET_PER_FRAME =
    this.scoreCalculatorService.PINS_SET_AS_TARGET_PER_FRAME

  isGameFrameSpare = false

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private scoreCalculatorService: ScoreCalculatorService
  ) {
    this.buildForm()
    this.store
      .select(state => state.frames)
      .subscribe(frames => {
        const lastFrameInGame =
          frames[this.scoreCalculatorService.GAME_LENGTH - 1]
        this.isGameFrameSpare = lastFrameInGame
          ? this.scoreCalculatorService.isSpare(lastFrameInGame)
          : false
      })
  }

  buildForm() {
    this.form = this.formBuilder.group({
      firstRollInputField: [
        '',
        Validators.compose([
          Validators.required,
          Validators.max(this.PINS_SET_AS_TARGET_PER_FRAME),
          Validators.min(0),
        ]),
      ],
      secondRollInputField: [
        { value: '', disabled: true },
        Validators.compose([
          Validators.required,
          Validators.max(this.PINS_SET_AS_TARGET_PER_FRAME),
          Validators.min(0),
        ]),
      ],
    })

    this.firstRollInputControl = this.form.get('firstRollInputField')
    this.secondRollInputControl = this.form.get('secondRollInputField')
  }

  onFirstRollInputElementValueChange(fistRollElement: HTMLInputElement) {
    if (this.isGameFrameSpare) {
      return
    }

    const value = parseInt(fistRollElement.value)

    if (value === this.PINS_SET_AS_TARGET_PER_FRAME) {
      this.secondRollInputControl?.setValue(0)
      this.secondRollInputControl?.disable()
    } else if (value) {
      this.secondRollInputControl?.setValue('')
      this.secondRollInputControl?.enable()
    }
  }

  public onSubmit() {
    if (
      !this.firstRollInputControl?.errors &&
      !this.secondRollInputControl?.errors
    ) {
      this.store.dispatch({
        type: ADD_FRAME,
        payload: <Frame>{
          first: this.firstRollInputControl.value,
          second: this.secondRollInputControl.value,
        },
      })
      this.buildForm()
    }
  }
  public restGame() {
    this.store.dispatch({
      type: REMOVE_ALL_FRAMES,
    })

    this.buildForm()
  }
}
