import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageRoutingModule } from './home-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,FormsModule,ReactiveFormsModule,MatIconModule,MatButtonModule,MatBadgeModule,HttpClientModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
