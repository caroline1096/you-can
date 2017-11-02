import { Usuario } from './../../models/usuario';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario = {} as Usuario;

  constructor(public navCtrl: NavController,
              private afAuth: AngularFireAuth,
              public navParams: NavParams,
              public alertCtrl: AlertController ) {
  }


  async login(usuario:Usuario) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.password);
      if (result) {
        this.navCtrl.setRoot(HomePage);
      }  
    }
    catch (e) {
     
        let alert = this.alertCtrl.create({
          title: 'E-mail inválido',
          subTitle: 'É necessário digitar um e-mail válido. Caso ainda não seja cadastrado digite o e-mail e senha e clique em cadastrar',
          buttons: ['OK']
        });
        alert.present();
      }
    }
  
 
  async cadastro (usuario: Usuario) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        usuario.email,
        usuario.password
      );
      if (result) {
        this.navCtrl.setRoot(HomePage);
      }
    } catch (e) {
      let alert = this.alertCtrl.create({
        title: 'E-mail inválido',
        subTitle: 'É necessário digitar um e-mail válido',
        buttons: ['OK']
      });
      alert.present();
    }
    }
  }


