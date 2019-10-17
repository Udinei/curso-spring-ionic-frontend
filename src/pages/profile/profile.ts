import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../Services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../Services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  // declaracao de variavel do tipo clienteDTO
   cliente: ClienteDTO;
   picture: string;
   cameraOn: boolean = false;

  constructor(
     public navCtrl: NavController, // responsavel pelo redirecionamento de paginas
     public navParams: NavParams,
     public storage: StorageService,
     public clienteService: ClienteService,
     public camera: Camera ) {
  }

  // esse metodo e carregado quando a pagina e exibida
  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email) // retorna um clienteDTO
      .subscribe(response => { // se increvendo pra receber a resposta do metodo findByEmail em caso de sucesso
          this.cliente = response as ClienteDTO; // as ClienteDTO é necessario para informar que vai ser retornado o objeto completo do backend 
          this.getImageIfExists();
      },
      error => { 

        // se userLocal invalido
        if (error.status == 403) {
          // redireciona para a home
          this.navCtrl.setRoot('HomePage');
        }
      });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

    getImageIfExists(){
      this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => { // se inscrevendo pra receber o retorno. Em caso de sucesso o retorno do metodo acima vira no response
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
      error => {});
            
    }
    
    getCameraPicture(){
      this.cameraOn = true;

      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
        this.picture = 'data:image/png;base64,'+ imageData;
        this.cameraOn = false;

      }, (err) => {

      });
    }
}
