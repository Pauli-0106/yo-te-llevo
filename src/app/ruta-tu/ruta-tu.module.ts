import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutaTuPageRoutingModule } from './ruta-tu-routing.module';

import { RutaTuPage } from './ruta-tu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutaTuPageRoutingModule
  ],
  declarations: [RutaTuPage]
})
export class RutaTuPageModule {}
