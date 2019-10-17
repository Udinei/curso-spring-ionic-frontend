import { HttpClient } from "@angular/common/http";
import { PedidoDTO } from "../../models/pedido.dto";
import { API_CONFIG } from "../../config/api.config";
import { Injectable } from "@angular/core";

@Injectable()
export class PedidoService {
    constructor (public http: HttpClient){

    }

    insert(obj: PedidoDTO){
        // inserindo um pedido, 
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`, // url da api de pedidos
            obj, // obj Pedido que sera inserido, 
            {
                observe: 'response', // coloca no observe a resposta retornada
                responseType: 'text'  // o metodo pedido no backend retorna uma resposta de corpo vazio (ResponseEntity<Void>)
                                      // por isso é necessario  esse atributo responseType com 'text', para evitar que o Json tente parsear o retorno, provocando assim um erro - 
            }
        )
    }
}