import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../Services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../Services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

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

  // declaracao de variavel do tipo clienteDTO
   cliente: ClienteDTO;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public storage: StorageService,
     public clienteService: ClienteService ) {
  }

  // esse metodo e carregado quando a pagina e exibida
  ionViewDidLoad() {
    let localUser = this.storage.getlocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email) // retorna um clienteDTO
      .subscribe(response => { // se increvendo pra receber a resposta do metodo findByEmail em caso de sucesso
          this.cliente = response; // atribui ao cliente o clienteDTO recebido do request
          this.getImageIfExists();
      },
      error => { });
    }
  }

    getImageIfExists(){
      this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => { // se inscrevendo pra receber o retorno. Em caso de sucesso o retorno do metodo acima vira no response
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
      error => {});
            
    }

}