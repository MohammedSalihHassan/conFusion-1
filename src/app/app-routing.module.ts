import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routess } from './routess';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routess)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
