import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../Services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../Services/domain/cart.service';



@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService) {

  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    this.produtoService.findById(produto_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
        error => { });
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => { // se inscrevendo pra receber o retorno. Em caso de sucesso o retorno do metodo acima vira no response
        this.item.imageUrl =`${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;

      },
        error => { });

  }

  addToCart(produto: ProdutoDTO){
      this.cartService.addProduto(produto);
      this.navCtrl.setRoot('CartPage');

  }

}
