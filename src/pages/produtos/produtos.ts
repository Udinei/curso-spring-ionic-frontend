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

  items: ProdutoDTO[] = []; // a lista vai começar vazia
  page: number = 0;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }


  ionViewDidLoad() {
    this.loadData();
  }


  loadData() {
    // pegando o parametro passado pela pagina anterior
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();


    this.produtoService.findByCategoria(categoria_id, this.page, 10) // recupera categiria de 10 em 10
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']); // junta a pagina anterior com a proxima(concate) obtendo atributo (tipo lista) retornado pela api no response
        let end = this.items.length - 1;

        loader.dismiss() // apos chegar a resposta com os itens fecha a animação
        console.log(this.page);
        console.log(this.items);


        this.loadImageUrls(start, end); // seta o endereco da imagem do produto no atributo ImageUrl de produtoDTO


      },
        error => {
          loader.dismiss(); // se houver algum erro na resposta fecha a animacao
        });

  }

  /** recebe o endereco da imagem e seta em cada item de produtoDTO no atributo imageUrl
      o endereço da imabem, quando usuario clicar na imagem carrega a imagem  do
      produto do bucket da S3 da amazon*/
  loadImageUrls(start: number, end: number) {
    // percorre a lista de produtos
    for (var i = start; i <= end; i++) {

      let item = this.items[i];

      // pra cada produto da lista, recupera a imagem small vinda no response, 
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          // seta o endereco da imagem no item
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
          error => { });
    }
  }

  // Esse metodo sera utilizado no html, para receber o id do produto 
  // do html produto.html, do item do produto
  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', { produto_id: produto_id });
  }


  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    loader.present();
    return loader; // controlando o loader
  }

  // faz animação ao scrooll carregando dados
  doRefresh(refresher) {
    this.page = 0;  // começa da primeira pagina
    this.items = [];  // limpa lista de itens

    this.loadData(); // carrega os dados
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll){
    this.page++; // incrementa a pagina
    this.loadData(); // recupera mais dados

    setTimeout(() => {
      infiniteScroll.complete(); // remove a animacao
    }, 1000);

  }
}
