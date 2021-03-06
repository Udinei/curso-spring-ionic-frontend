import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriasService } from '../../Services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categorias.dto';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})

export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriasService) {

  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
    .subscribe(response => {
      this.items = response;
      

    }, error => {
      //console.log(error);
      // As msg de erro estão sendo exibidas pelao interceptor( error-interceptors.ts)
      // Essa funcao ( error = { } ) em branco é necessaria para que, 
      // o erro não seja exibido duas vezes, mas ela pode ser usada para 
      // outros tratamentos de erros que se achar necessarios
     

    });
  }
   
  /**Esse metodo navega entre paginas passando parametros para outra pagina */
  showProdutos(categoria_id : string) {
    this.navCtrl.push('ProdutosPage', { categoria_id: categoria_id });   // passando parametro para a pagina de destino  

  }

  

  

   
}
