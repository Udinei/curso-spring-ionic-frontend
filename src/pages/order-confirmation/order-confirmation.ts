import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../Services/domain/cart.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../Services/domain/cliente.service';



@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService) {

     // pega o objeto pedido que foi enviado como parametro da pagina anterior, e seta em pedido 
    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
    .subscribe(response => {
      this.cliente = response as ClienteDTO; // fazendo um cast para clinenteDTO

      // response['endereco'] - obtem o campo endereco do response
      this.endereco = this.findEndereco(
                      this.pedido.enderecoDeEntrega.id, response['enderecos']);
    }, 
    error => {
      this.navCtrl.setRoot('HomePage'); // se acontecer um erro, volta para pagina inicial e faz novamente login
    });
  }

  // retorna um enderecoDTO que tem o id passado como parametro
  private findEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO {

    // percorre a lista e retorna a posicao do endereco que tem o id como parametro
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total(){
    return this.cartService.total();

  }
}
