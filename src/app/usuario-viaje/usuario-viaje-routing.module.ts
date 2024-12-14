import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioViajePage } from './usuario-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioViajePageRoutingModule {}
