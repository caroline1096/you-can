import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';
import {PontoPage} from "../ponto/ponto";
import {ModalPage} from "../modal/modal-page";



@IonicPage()

@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html',
})
export class RelatorioPage {

  term: string = '';

  itemsRef: AngularFireList<any>;
  listaItem: Observable<any[]>;

  constructor(public angularFireDatabase: AngularFireDatabase,
              public navCtrl: ModalController) {
    this.initializeItems();
  }

  searchFn(ev: any) {
    this.term = ev.target.value;
  }

  visualizar(ponto) {
    let profileModal = this.navCtrl.create(ModalPage, { ponto: ponto });
    profileModal.present();
  }

  initializeItems() {
    this.itemsRef = this.angularFireDatabase.list('ponto');

    this.listaItem = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    });
  }
}



