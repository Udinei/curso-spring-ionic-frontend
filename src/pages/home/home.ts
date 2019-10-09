import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

// Permite referenciar a classe como string escrevendo seu nome entre aspas ex: "HomePage"
@IonicPage()

// Toda pagina tem uma classe controller definida por um decorator @Component
@Component({
  selector: 'page-home',
  templateUrl: 'home.html' // nome da pagina controlada por este controller
})

// Definicao e Nome da classe controladora
export class HomePage {

  // Injecao de dependencia -  basta declarar a classe com parametro no construtor da classe
  // NavController - classe de navegação de paginas
  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login() {
    this.navCtrl.setRoot('CategoriasPage') // vai para a pagina CategoriasPage
  }

}
