import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../Services/domain/cart.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../Services/domain/cliente.service';
import { PedidoService } from '../../Services/domain/pedido.service';




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
  codpedido: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService,
    ) {

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


  back(){
    this.navCtrl.setRoot('CartPage');
  }

  home(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout(){
    this.pedidoService.insert(this.pedido)
    .subscribe(response => {
      this.cartService.createOrClearCart();
      this.codpedido = this.extractId(response.headers.get('location'));
      
    },
       error => {
         if(error.status == 403) {
           this.navCtrl.setRoot('HomePage');
         }
       
    });
  }

  /** Retorna o id do pedido */
  private extractId(location: string): string {
    // retorna a posição(index) da barra /
    let position = location.lastIndexOf('/');
    // retorna todo o conteudo apos a posicao da barra ate o final
    return location.substring(position + 1, location.length);
   
  }
}
