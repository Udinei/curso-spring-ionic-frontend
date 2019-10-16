import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../Services/storage.service';
import { ClienteService } from '../../Services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../Services/domain/cart.service';


@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email) // retorna um clienteDTO
      .subscribe(response => { // se increvendo pra receber a resposta do metodo findByEmail em caso de sucesso
          this.items = response['enderecos'];
           
          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: {id: response['id']},
            enderecoDeEntrega: null,
            pagamento: null,
            // retorna uma nova lista de objetos, cujo objetos contem somente os atributos quantidade e o id do produto
            itens: cart.items.map(x => { return {quantidade: x.quantidade, produto: {id: x.produto.id}}}),


          }

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

  nextPage(item: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id: item.id};
    this.navCtrl.push('PaymentPage', {pedido: this.pedido});
  }

}
