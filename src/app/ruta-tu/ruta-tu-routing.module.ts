import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutaTuPage } from './ruta-tu.page';

const routes: Routes = [
  {
    path: '',
    component: RutaTuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutaTuPageRoutingModule {}
