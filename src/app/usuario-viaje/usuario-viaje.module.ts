import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioViajePageRoutingModule } from './usuario-viaje-routing.module';

import { UsuarioViajePage } from './usuario-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioViajePageRoutingModule
  ],
  declarations: [UsuarioViajePage]
})
export class UsuarioViajePageModule {}
