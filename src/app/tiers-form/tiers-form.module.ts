import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiersFormPageRoutingModule } from './tiers-form-routing.module';

import { TiersFormPage } from './tiers-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiersFormPageRoutingModule
  ],
  declarations: [TiersFormPage]
})
export class TiersFormPageModule {}
