import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DondeVoyPage } from './donde-voy.page';

const routes: Routes = [
  {
    path: '',
    component: DondeVoyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DondeVoyPageRoutingModule {}
