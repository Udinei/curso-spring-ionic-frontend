import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../Services/cidade.service';
import { EstadoService } from '../../Services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../Services/domain/cliente.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

/**
 * Essa classe realiza o processo de registo do usuario no app */
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[]
  cidades: CidadeDTO[]
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController

    ) {

    this.formGroup = this.formBuilder.group({
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['Rua Via', [Validators.required]],
      numero: ['25', [Validators.required]],
      complemento: ['Apto 3', []],
      bairro: ['Copacabana', []],
      cep: ['10828333', [Validators.required]],
      telefone1: ['977261827', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }

  ionViewDidLoad(){
    this.estadoService.findAll()
    .subscribe(response => {
       this.estados = response;
       // pega o primeiro estado da lista, e atribui no primeiro lemento do formulario
       this.formGroup.controls.estadoId.setValue(this.estados[0].id);
       this.updateCidades();
    },
     error => {});
    
  }
  
  // atualiza a combo de cidade em funcao do estado selecionado
  updateCidades() {
    // pega o codigo do estado que esta selecionado no html
    let estadoId = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estadoId) // carrega a lista de cidades correspondente ao estado selecionado
    .subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null); // deseleciona a cidade que estava selecionada
    },
    error => {});

  }

  signupUser() {
    
    this.clienteService.insert(this.formGroup.value)
    .subscribe(response => { // se inscrevendo para receber a resposta
      this.showInsertOk();
    },
     error => {});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create ({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false, // so sai do alert apertando no botao
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop(); // desempilha (fecha) a pagina  de cadastro de cliente de cima da pagiana de login
          }
        }
      ]
    });
    alert.present();

  }
}
