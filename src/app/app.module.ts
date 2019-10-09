// Nesse modulo contem todos os imports e paginas que serão utilizadas pela aplicacao

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//  @NgModule - Decorator são configuração que possuem atribuos e objetos com atributos:[] para alterar a classe
@NgModule({
  declarations: [
    MyApp
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
   
  ],
  providers: [  // sera utilizado somente uma instancia desses objetos nesse modulo
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {} // habilitando o uso desse modulo por outras classes
