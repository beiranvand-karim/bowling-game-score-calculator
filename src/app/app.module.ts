import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { BrowserModule } from '@angular/platform-browser'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { StoreModule } from '@ngrx/store'

import { HomePageComponent, NotFoundPageComponent } from './pages'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { framesReducer } from './reducers'
import {
  FramePerformanceReceivingFormComponent,
  FrameHitsFormCardComponent,
} from './components'

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundPageComponent,
    FramePerformanceReceivingFormComponent,
    FrameHitsFormCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ frames: framesReducer }),
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
