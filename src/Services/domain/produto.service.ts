import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ThrowStmt } from "@angular/compiler";
import { ProdutoDTO } from "../../models/protuto.dto";


@Injectable() // @Injectable() - permite a classe ser injetada em outras classes
export class ProdutoService {
    
    constructor(public http: HttpClient)  {

    }

    /** retorna os dados do produto por id*/
    findById(produto_id: string){
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);

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

     // obtem a imagem small do produto do bucket por id do produto
     getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`; // monta url da imagem do produto o endereco basico do bucket, e concatena  com o id do produto
        return this.http.get(url, {responseType : 'blob'}); // retorna o enderecço da imagem no bucket da amazon S3
    }


     

}