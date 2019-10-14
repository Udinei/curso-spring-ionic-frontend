import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

@Injectable() // @Injectable() - permite a classe ser injetada em outras classes
export class ProdutoService {
    
    constructor(public http: HttpClient)  {

    }

     findByCategoria(categoria_id : string) {
         return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
     }

}