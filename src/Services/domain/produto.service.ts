import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";


@Injectable() // @Injectable() - permite a classe ser injetada em outras classes
export class ProdutoService {
    
    constructor(public http: HttpClient)  {

    }

    /** Esse metodo chama uma api no backend, que retorna o id das categorias 
      do produto */
     findByCategoria(categoria_id : string) {
         return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
     }


      /** Esse metodo monta o endereco da imagem do produto, recebe como
       *  parametro o id do produto e com base na url da api, e na string
       *  "/prod" + id do produto + a string "-small.jpg" 
       *  monta a url e chama a api no backend, e retorna um objeto 
       * Observable contendo o endereco da imagem no bucket  da amazon S3 */
     getSmallImageFromBucket(id : string) : Observable<any> {
         let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`; // obtem o endereco basico do bucket, e concatena  com o id do produto
         return this.http.get(url, {responseType : 'blob'}); // retorna o enderecço da imagem no bucket da amazon S3
     }

}