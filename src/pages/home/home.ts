import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../Services/auth.service';

// Permite referenciar a classe como string escrevendo seu nome entre aspas ex: "HomePage"
@IonicPage()

// Toda pagina tem uma classe controller definida por um decorator @Component
@Component({
  selector: 'page-home',
  templateUrl: 'home.html' // nome da pagina controlada por este controller
})


// Definicao e Nome da classe controladora
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };


  // Injecao de dependencia -  basta declarar a classe com parametro no construtor da classe
  // NavController - classe de navegação de paginas
  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService) // injetando classe AuthService em auth, declara em auth.services.ts
  {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  // evento de ciclo de vida
  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => { // recebendo a resposta
        this.auth.sucessfullLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot('CategoriasPage') // redireciona para a pagina CategoriasPage
      },
        error => {

        }
      );
  }




  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => { // se inscrevendo para poder receber a resposta do metodo
        this.auth.sucessfullLogin(response.headers.get("Authorization"));
        //console.log(response.headers.get("Authorization"));
        this.navCtrl.setRoot('CategoriasPage') // vai para a pagina CategoriasPage
      },
        error => {

        }
      );
  }
}
