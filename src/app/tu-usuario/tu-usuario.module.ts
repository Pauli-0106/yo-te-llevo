import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TuUsuarioPageRoutingModule } from './tu-usuario-routing.module';

import { TuUsuarioPage } from './tu-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TuUsuarioPageRoutingModule
  ],
  declarations: [TuUsuarioPage]
})
export class TuUsuarioPageModule {}
