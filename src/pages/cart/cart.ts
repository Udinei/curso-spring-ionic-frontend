import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProdutoService } from '../../Services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../Services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';



@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public cartService: CartService,
     public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
    
  }

  /** recebe o endereco da imagem e seta em cada item de produtoDTO no atributo imageUrl
      o endereço da imabem, quando usuario clicar na imagem carrega a imagem  do
      produto do bucket da S3 da amazon*/
      loadImageUrls() {
        // percorre a lista de produtos
        for (var i = 0; i < this.items.length; i++) {
          
          let item  = this.items[i];
          
          // pra cada produto da lista, recupera a imagem small vinda no response, 
          this.produtoService.getSmallImageFromBucket(item.produto.id)
          .subscribe(response => {
            // seta o endereco da imagem no item
            item.produto.imageUrl =  `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
            console.log(item.produto.imageUrl);
          },
          error => {});
        }
      }

      removeItem(produto: ProdutoDTO){
        this.items = this.cartService.removeProduto(produto).items;
      }

      increaseQuantity(produto: ProdutoDTO){
        this.items = this.cartService.increaseQuantity(produto).items;

      }

      decreaseQuantity(produto: ProdutoDTO){
        this.items = this.cartService.decreaseQuantity(produto).items;
      }
      
      total() : number {
        return this.cartService.total();
      }

      goOn() {
        this.navCtrl.setRoot('CategoriasPage');
      }
      

}
