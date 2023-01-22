import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { HomePageComponent, NotFoundPageComponent } from './pages'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent, HomePageComponent, NotFoundPageComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
