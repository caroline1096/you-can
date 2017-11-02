import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase} from "angularfire2/database";
import {Ponto} from "../../models/ponto.model";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-ponto',
  templateUrl: 'ponto.html',
})
export class PontoPage {

  lista: Observable<any[]>;
  ponto: Ponto;

  constructor(private camera: Camera,
              public navCtrl: NavController,
              private geolocation: Geolocation,
              public database: AngularFireDatabase) {

    this.lista = this.database.list('/ponto').valueChanges();
    this.ponto = new Ponto();
    this.ponto.itemImg = null;
    this.ponto.itemLat;
    this.ponto.itemLog;
  }

  abreCamera(){
    let config:CameraOptions ={
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(config).then((imageData) => {
      this.ponto.itemImg = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });

  }

  getPosiscaoAtual(){
    this.geolocation.getCurrentPosition().then((resp) => {

      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);

      this.ponto.itemLat = resp.coords.latitude;
      this.ponto.itemLog = resp.coords.longitude;

    }).catch((error) => {
      alert("Erro" + error.message);
    });
  }

  salvar() {
    
    this.database.list('ponto').push(this.ponto)
      .then(() => {
        console.log('Salvou!!!');
        this.ponto = new Ponto();
        this.navCtrl.push(HomePage);
      });
  }
}


