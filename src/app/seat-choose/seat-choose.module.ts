import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeatChoosePageRoutingModule } from './seat-choose-routing.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SeatChoosePage } from './seat-choose.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,TooltipModule,
    IonicModule,
    SeatChoosePageRoutingModule
  ],
  declarations: [SeatChoosePage]
})
export class SeatChoosePageModule {}
