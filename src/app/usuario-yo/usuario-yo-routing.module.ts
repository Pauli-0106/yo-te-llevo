import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioYoPage } from './usuario-yo.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioYoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioYoPageRoutingModule {}
