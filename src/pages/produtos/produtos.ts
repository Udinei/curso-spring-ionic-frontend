import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../Services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
// classe controladora da interface DTO
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController ) {
  }


  ionViewDidLoad() {
    // pegando o parametro passado pela pagina anterior
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();


    this.produtoService.findByCategoria(categoria_id)
    .subscribe(response => {
      this.items = response['content']; // obtendo atributo (tipo lista) retornado pela api no response
      loader.dismiss() // apos chegar a resposta com os itens fecha a animação

      this.loadImageUrls(); // seta o endereco da imagem do produto no atributo ImageUrl de produtoDTO
       

    },
    error => {
      loader.dismiss(); // se houver algum erro na resposta fecha a animacao
    });

  }

  /** recebe o endereco da imagem e seta em cada item de produtoDTO no atributo imageUrl
      o endereço da imabem, quando usuario clicar na imagem carrega a imagem  do
      produto do bucket da S3 da amazon*/
  loadImageUrls() {
    // percorre a lista de produtos
    for (var i = 0; i < this.items.length; i++) {
      
      let item  = this.items[i];
      
      // pra cada produto da lista, recupera a imagem small vinda no response, 
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(response => {
        // seta o endereco da imagem no item
        item.imageUrl =  `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      },
      error => {});
    }
  }
   
  // Esse metodo sera utilizado no html, para receber o id do produto 
  // do html produto.html, do item do produto
  showDetail(produto_id : string){
    this.navCtrl.push('ProdutoDetailPage', {  produto_id: produto_id });
  }

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    loader.present();
    return loader; // controlando o loader
  }
}
