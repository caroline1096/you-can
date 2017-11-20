import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase} from "angularfire2/database";
import {Ponto} from "../../models/ponto.model";
import {HomePage} from "../home/home";
import {ImageProvider} from "../../providers/image/image";
import {AngularFireAuth} from "angularfire2/auth";


@IonicPage()
@Component({
  selector: 'page-modal-page',
  templateUrl: 'modal-page.html',
})
export class ModalPage {

  pontoKey: string;
  rate: any;
  lista: Observable<any[]>;
  ponto: Ponto;

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private imageSrv: ImageProvider,
              private afAuth: AngularFireAuth,
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
      this.ponto.itemImg = this.navParams.data.ponto.itemImg;
      this.downloadImageUrls();
    } else {
      this.lista = this.database.list('/ponto').valueChanges();
      this.ponto = new Ponto();
      this.ponto.itemImg = null;
      this.ponto.itemTipo = "1";
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }


  downloadImageUrls() {
    let promise = this.imageSrv.getImage(this.afAuth.auth.currentUser.uid, this.ponto.itemImg);
    console.log(promise);
  }
}
