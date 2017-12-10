import { Geolocation } from '@ionic-native/geolocation';
import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {IonicPage} from "ionic-angular";
import {ModalController} from 'ionic-angular';
import {MapDirecrionsDirective} from "../../directives/map-direcrions/map-direcrions";
import {ModalPage} from "../modal/modal-page";
import {MapsAPILoader} from "@agm/core";

declare var google: any;

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
              private mapsAPILoader:  MapsAPILoader,
              private ngZone: NgZone,
              public navCtrl: ModalController) {


    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(document.getElementById('txtHome').getElementsByTagName('input')[0], {types: ["address"]});
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult=autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.valor = autocomplete.getPlace().formatted_address;
        });
      });
    });

    this.itemsRef = angularFireDatabase.list('ponto');
    this.listaItem = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    });
  }


  getLatLan() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(this.valor);
      console.log(resp.coords.latitude +''+ resp.coords.longitude);
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
