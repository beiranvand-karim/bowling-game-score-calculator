import { HomePageComponent, NotFoundPageComponent } from './pages'

import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

const routes: Routes = [
  { path: '**', component: NotFoundPageComponent },
  { path: '', component: HomePageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
