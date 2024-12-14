import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DendeLlevoPageRoutingModule } from './dende-llevo-routing.module';

import { DendeLlevoPage } from './dende-llevo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DendeLlevoPageRoutingModule
  ],
  declarations: [DendeLlevoPage]
})
export class DendeLlevoPageModule {}
