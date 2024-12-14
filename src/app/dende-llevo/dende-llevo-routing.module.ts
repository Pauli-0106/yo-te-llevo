import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DendeLlevoPage } from './dende-llevo.page';

const routes: Routes = [
  {
    path: '',
    component: DendeLlevoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DendeLlevoPageRoutingModule {}
