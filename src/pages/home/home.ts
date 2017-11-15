import { Geolocation } from '@ionic-native/geolocation';
import {Component, ViewChild} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {IonicPage} from "ionic-angular";
import {ModalController} from 'ionic-angular';
import {MapDirecrionsDirective} from "../../directives/map-direcrions/map-direcrions";
import {ModalPage} from "../modal/modal-page";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(MapDirecrionsDirective) vc:MapDirecrionsDirective;
  origin;
  destination;

  valor: string;
  itemsRef: AngularFireList<any>;
  listaItem: Observable<any[]>;

  latitude: number = -27.8051959;
  longitude: number = -50.3204698;

  constructor(public angularFireDatabase: AngularFireDatabase,
              private geolocation: Geolocation,
              public navCtrl: ModalController) {

    this.itemsRef = angularFireDatabase.list('ponto');
    this.listaItem = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    });

  }

  getLatLan() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.vc.origin = {lattitude: resp.coords.latitude, longitude: resp.coords.longitude};
      this.vc.destination = this.valor;
      this.vc.updateDirections();
    }).catch((error) => {
      alert("Erro" + error.message);
    });
  }

  clickedMarker(ponto) {
    let profileModal = this.navCtrl.create(ModalPage, { ponto: ponto });
    profileModal.present();
  }
}
