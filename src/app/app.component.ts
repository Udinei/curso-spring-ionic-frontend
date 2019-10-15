import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../Services/auth.service';

// @Component -  informa que esse arquivo é um controller
@Component({
  templateUrl: 'app.html' // pagina controlada
})

// Controlador da pagina app.html
export class MyApp {

  // declaracao de variaveis
  @ViewChild(Nav) nav: Nav;

  rootPage: string  = "HomePage";
  pages: Array<{title: string, component: string}>;


  // metodo construtor
  constructor(public platform: Platform, 
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public auth: AuthService
              ) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Categorias', component: 'CategoriasPage' },
      { title: 'Carrinho', component: 'CartPage' },
      { title: 'Logout', component: ''}
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /** Esse metodo é chamado por app.html, em button no bind de evento da diretiva *nfFor, para montar o menu */
  openPage(page : {title:string, component:string}) {

    switch (page.title){
      case 'Logout':
        this.auth.logout(); // retira o token do storage
        this.nav.setRoot('HomePage'); // redireciona para a homepage
        break;

      default:
          this.nav.setRoot(page.component);
    }
    
  }
}
