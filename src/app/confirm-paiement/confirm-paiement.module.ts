import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmPaiementPageRoutingModule } from './confirm-paiement-routing.module';

import { ConfirmPaiementPage } from './confirm-paiement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmPaiementPageRoutingModule
  ],
  declarations: [ConfirmPaiementPage]
})
export class ConfirmPaiementPageModule {}
