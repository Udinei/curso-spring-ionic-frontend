import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categorias.dto";
import { Observable } from "rxjs/Rx";


@Injectable() // @Injectable() - permite a classe ser injetada em outras classes
export class CategoriasService {
    
    constructor(public http: HttpClient)  {

    }

     findAll() : Observable<CategoriaDTO[]> {
         return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`)
     }

}