import { Ponto } from './../../models/ponto.model';
import {Component} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {NavController, IonicPage} from "ionic-angular";
import { Modal, ModalController, ModalOptions } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  listaItem: Observable<any[]>;
  markes: Ponto[];

  latitude: number = -27.8051959;
  longitude: number = -50.3204698;

  constructor(public angularFireDatabase: AngularFireDatabase,
              public navCtrl: NavController,
              private modal: ModalController,) {
    this.listaItem = this.angularFireDatabase.list('ponto').valueChanges();
  }
  
  clickedMarker(ponto: Ponto) {
    console.log(ponto);
    const myModalOptions: ModalOptions = {
        enableBackdropDismiss: false
      };
  
  const myModalData = {
        name: 'Paul Halliday',
        occupation: 'Developer'
         };

       const myModal: Modal = this.modal.create('ModalPage', {data: myModalData}, myModalOptions);
    
    
         myModal.present();
    
         myModal.onDidDismiss((data) => {
           console.log("I have dismissed.");
           console.log(data);
         });
    
         myModal.onWillDismiss((data) => {
           console.log("I'm about to dismiss");
           console.log(data);
         });
       }
}
