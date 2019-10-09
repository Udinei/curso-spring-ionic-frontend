import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

// Permite referenciar a classe como string escrevendo seu nome entre aspas ex: "HomePage"
@IonicPage()

// Toda pagina tem uma classe controller definida por um decorator @Component
@Component({
  selector: 'page-home',
  templateUrl: 'home.html' // nome da pagina controlada por este controller
})

// Definicao e Nome da classe controladora
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
