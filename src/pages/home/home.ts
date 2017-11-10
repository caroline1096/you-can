
import {Component, NgZone} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {IonicPage} from "ionic-angular";
import {ModalController} from 'ionic-angular';
import {PontoPage} from "../ponto/ponto";
import {MapsAPILoader} from "@agm/core";

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  address: string;
  valor: string;
  itemsRef: AngularFireList<any>;
  listaItem: Observable<any[]>;

  latitude: number = -27.8051959;
  longitude: number = -50.3204698;

  constructor(public angularFireDatabase: AngularFireDatabase,
              private __loader: MapsAPILoader, private __zone: NgZone,
              public navCtrl: ModalController) {
    this.itemsRef = angularFireDatabase.list('ponto');

    this.listaItem = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    });
  }

  getLatLan() {
    this.address = this.valor;
    console.log('Getting Address - ', this.address);
    let geocoder = new google.maps.Geocoder();
    Observable.create(observer => {
      geocoder.geocode( { 'address': this.address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          observer.next(results[0].geometry.location);
          console.log(results[0].geometry.location.lat());
          console.log(results[0].geometry.location.lng());
          observer.complete();
        } else {
          console.log('Error - ', results, ' & Status - ', status);
          observer.next({});
          observer.complete();
        }
      });
    })
  }

  clickedMarker(ponto) {
    let profileModal = this.navCtrl.create(PontoPage, { ponto: ponto });
    profileModal.present();
  }
}
