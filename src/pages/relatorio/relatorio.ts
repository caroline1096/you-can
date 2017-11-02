import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';



@IonicPage()

@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html',
})
export class RelatorioPage {
  
  
  searchQuery: string = '';
  items: string[];

  listaItem: Observable<any[]>;

  constructor(public angularFireDatabase: AngularFireDatabase,
              public navCtrl: NavController,
              ) {

                this.initializeItems();
          

    
  
  }

  initializeItems() {
    this.listaItem = this.angularFireDatabase.list('ponto').valueChanges();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.listaItem = this.listaItem.filter((listaItem) => {
        return (listaItem.indexOf(val.toLowerCase()) > -1);
        console.log("teste");
        
        
      })
    }
  }
}



  