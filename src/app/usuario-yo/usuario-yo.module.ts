import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioYoPageRoutingModule } from './usuario-yo-routing.module';

import { UsuarioYoPage } from './usuario-yo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioYoPageRoutingModule
  ],
  declarations: [UsuarioYoPage]
})
export class UsuarioYoPageModule {}
