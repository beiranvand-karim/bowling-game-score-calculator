import { HomePageComponent, NotFoundPageComponent } from './pages'

import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '**', component: NotFoundPageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
