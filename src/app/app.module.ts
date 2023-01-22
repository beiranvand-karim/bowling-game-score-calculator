import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { BrowserModule } from '@angular/platform-browser'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table'
import { MatCardModule } from '@angular/material/card'
import { StoreModule } from '@ngrx/store'

import { HomePageComponent, NotFoundPageComponent } from './pages'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { framesReducer } from './reducers'
import {
  FramePerformanceReceivingFormComponent,
  GameScoringHistoryTableComponent,
  GameScoringHistoryCardComponent,
  FrameHitsFormCardComponent,
} from './components'

@NgModule({
  declarations: [
    FramePerformanceReceivingFormComponent,
    GameScoringHistoryCardComponent,
    GameScoringHistoryTableComponent,
    FrameHitsFormCardComponent,
    NotFoundPageComponent,
    HomePageComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ frames: framesReducer }),
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
