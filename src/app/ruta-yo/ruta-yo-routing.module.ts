import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutaYoPage } from './ruta-yo.page';

const routes: Routes = [
  {
    path: '',
    component: RutaYoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutaYoPageRoutingModule {}
