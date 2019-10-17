// Nesse modulo contem todos os imports e paginas que serão utilizadas pela aplicacao

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriasService } from '../Services/domain/categoria.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptors';
import { AuthService } from '../Services/auth.service';
import { StorageService } from '../Services/storage.service';
import { ClienteService } from '../Services/domain/cliente.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ProdutoService } from '../Services/domain/produto.service';
import { CartService } from '../Services/domain/cart.service';
import { ImageUtilService } from '../Services/image-util.service.';

//  @NgModule - Decorator são configuração que possuem atribuos e objetos com atributos:[] para alterar a classe
@NgModule({
  declarations: [
    MyApp
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
   
  ],
  providers: [  // sera utilizado somente uma instancia desses objetos para toda a aplicação
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriasService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService, 
    StorageService,
    ClienteService,
    ProdutoService,
    CartService,
    ImageUtilService
  ]
})
export class AppModule {} // habilitando o uso desse modulo por outras classes
