import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../Services/storage.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  // declaracao de variavel do tipo string
  email: string

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public storage: StorageService) {
  }

  // esse metodo e carregado quando a pagina e exibida
  ionViewDidLoad() {
    let localUser = this.storage.getlocalUser();
    if(localUser && localUser.email){
      this.email = localUser.email;
    }
    console.log('ionViewDidLoad ProfilePage');
  }

}
