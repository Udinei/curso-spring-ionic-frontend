import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { CidadeService } from '../../Services/domain/cidade.service';
import { EstadoService } from '../../Services/domain/estado.service';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers: [
    CidadeService,
    EstadoService
  ]

})
export class SignupPageModule {}
