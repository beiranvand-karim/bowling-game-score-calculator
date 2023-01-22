import { BrowserModule } from '@angular/platform-browser'
import { StoreModule } from '@ngrx/store'
import { NgModule } from '@angular/core'

import { HomePageComponent, NotFoundPageComponent } from './pages'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { framesReducer } from './reducers'

@NgModule({
  declarations: [AppComponent, HomePageComponent, NotFoundPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ frames: framesReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
