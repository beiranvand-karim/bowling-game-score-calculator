import { BrowserModule } from '@angular/platform-browser'
import { StoreModule } from '@ngrx/store'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { FramePerformanceReceivingFormComponent } from './components'
import { HomePageComponent, NotFoundPageComponent } from './pages'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { framesReducer } from './reducers'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundPageComponent,
    FramePerformanceReceivingFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forRoot({ frames: framesReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
