import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DondeVoyPageRoutingModule } from './donde-voy-routing.module';

import { DondeVoyPage } from './donde-voy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DondeVoyPageRoutingModule
  ],
  declarations: [DondeVoyPage]
})
export class DondeVoyPageModule {}
