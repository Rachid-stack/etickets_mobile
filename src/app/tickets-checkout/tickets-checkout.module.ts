import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketsCheckoutPageRoutingModule } from './tickets-checkout-routing.module';

import { TicketsCheckoutPage } from './tickets-checkout.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,QRCodeModule,
    IonicModule,
    TicketsCheckoutPageRoutingModule
  ],
  declarations: [TicketsCheckoutPage]
})
export class TicketsCheckoutPageModule {}
