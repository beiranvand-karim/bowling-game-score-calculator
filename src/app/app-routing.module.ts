import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent, NotFoundPageComponent } from './pages'

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '**', component: NotFoundPageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
