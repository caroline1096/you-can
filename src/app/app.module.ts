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
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import {GOOGLE_MAPS_API} from "./google-maps-api.credentials";
import { AngularFireAuthModule } from 'angularfire2/auth';
import {FormsModule} from "@angular/forms";
import {SearchPipe} from "../pipes/search/search";
import {TipoPontoPipe} from "../pipes/tipo-ponto/tipo-ponto";
import {AgmJsMarkerClustererModule, ClusterManager} from "@agm/js-marker-clusterer";
import {MapDirecrionsDirective} from "../directives/map-direcrions/map-direcrions";
import { ImageProvider } from '../providers/image/image';
import {ModalPage} from "../pages/modal/modal-page";
import {Ionic2RatingModule} from "ionic2-rating";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PontoPage,
    RelatorioPage,
    SobrePage,
    SearchPipe,
    TipoPontoPipe,
    ModalPage,

    MapDirecrionsDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot(GOOGLE_MAPS_API),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    AgmJsMarkerClustererModule,
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PontoPage,
    RelatorioPage,
    SobrePage,
    ModalPage,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AngularFireDatabase,
    Geolocation,
    ClusterManager,
    GoogleMapsAPIWrapper,
    ImageProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
