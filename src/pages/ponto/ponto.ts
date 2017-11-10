import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase} from "angularfire2/database";
import {Ponto} from "../../models/ponto.model";
import {HomePage} from "../home/home";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@IonicPage()
@Component({
  selector: 'page-ponto',
  templateUrl: 'ponto.html',
})
export class PontoPage {

  formsModel: FormGroup;
  pontoKey: string;

  lista: Observable<any[]>;
  ponto: Ponto;

  constructor(private camera: Camera,
              private navCtrl: NavController,
              private geolocation: Geolocation,
              private builder: FormBuilder,
              private viewCtrl: ViewController,
              private navParams: NavParams,
              private database: AngularFireDatabase) {

    if (this.navParams.data.ponto) {
      this.pontoKey = this.navParams.data.ponto.key;

      this.ponto = new Ponto();
      this.ponto.itemTipo = this.navParams.data.ponto.itemTipo;
      this.ponto.itemData = this.navParams.data.ponto.itemData;
      this.ponto.itemDesc = this.navParams.data.ponto.itemDesc;
      this.ponto.itemLat = this.navParams.data.ponto.itemLat;
      this.ponto.itemLocal = this.navParams.data.ponto.itemLocal;
      this.ponto.itemLog = this.navParams.data.ponto.itemLog;
    } else {
      this.lista = this.database.list('/ponto').valueChanges();
      this.ponto = new Ponto();
      this.ponto.itemImg = null;
      this.ponto.itemTipo = "1";
    }

    this.formsModel = builder.group({
      nomeLocal:['', Validators.required],
      data:['', Validators.required],
      tipoLocal:['', Validators.required],
      descricao:['', Validators.required],
    });
  }

  close() {
  this.viewCtrl.dismiss();
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

      this.ponto.itemLat = resp.coords.latitude;
      this.ponto.itemLog = resp.coords.longitude;

      if (!this.navParams.data.ponto) {
        this.database.list('ponto').push(this.ponto)
          .then(() => {
            this.ponto = new Ponto();
            this.navCtrl.push(HomePage);
          });
      }

    }).catch((error) => {
      alert("Erro" + error.message);
    });
  }

  salvar() {
    this.getPosiscaoAtual();
  }
}


