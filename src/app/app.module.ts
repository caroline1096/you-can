import { SobrePage } from './../pages/sobre/sobre';
import { RelatorioPage } from './../pages/relatorio/relatorio';
import { PontoPage } from '../pages/ponto/ponto';
import { LoginPage } from './../pages/login/login';
import { HomePage } from './../pages/home/home';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {AgmCoreModule} from '@agm/core';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import {GOOGLE_MAPS_API} from "./google-maps-api.credentials";
import { AngularFireAuthModule } from 'angularfire2/auth';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PontoPage,
    RelatorioPage,
    SobrePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot(GOOGLE_MAPS_API),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PontoPage,
    RelatorioPage,
    SobrePage,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AngularFireDatabase,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
