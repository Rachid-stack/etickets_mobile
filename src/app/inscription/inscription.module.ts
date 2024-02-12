import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { AlertComponent } from '../alert/alert.component';
import { InscriptionPageRoutingModule } from './inscription-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { InscriptionPage } from './inscription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    InscriptionPageRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [InscriptionPage,AlertComponent]
})
export class InscriptionPageModule {}
