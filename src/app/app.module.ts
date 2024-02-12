import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {provideNativeDateAdapter} from '@angular/material/core';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,FormsModule,QRCodeModule,HttpClientModule, ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot(), provideFirebaseApp(() => initializeApp({"projectId":"etickets-app","appId":"1:831215469151:web:530bc8619a0a3f540011ea","storageBucket":"etickets-app.appspot.com","apiKey":"AIzaSyAdLZh0HnvKd9_80veUuzisCl6DdBVV2zo","authDomain":"etickets-app.firebaseapp.com","messagingSenderId":"831215469151","measurementId":"G-X73S7VZ8KM"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideFunctions(() => getFunctions()), provideStorage(() => getStorage()), BrowserAnimationsModule,MatInputModule,
  MatButtonModule,
  MatIconModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },provideNativeDateAdapter()],
  bootstrap: [AppComponent],
})
export class AppModule {}
