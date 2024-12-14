import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutaYoPageRoutingModule } from './ruta-yo-routing.module';

import { RutaYoPage } from './ruta-yo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutaYoPageRoutingModule
  ],
  declarations: [RutaYoPage]
})
export class RutaYoPageModule {}
