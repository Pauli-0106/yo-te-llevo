import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TuUsuarioPage } from './tu-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: TuUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TuUsuarioPageRoutingModule {}
