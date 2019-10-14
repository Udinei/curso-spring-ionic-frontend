import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/protuto.dto';
import { ProdutoService } from '../../Services/domain/produto.service';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }


  ionViewDidLoad() {
    // pegando o parametro passado pela pagina anterior
    let categoria_id = this.navParams.get('categoria_id');

    this.produtoService.findByCategoria(categoria_id)
    .subscribe(response => {
      this.items = response['content']; // obtendo atributo (tipo lista) retornado pela api no response

    },
    error => {});

  }
}
