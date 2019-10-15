﻿import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";



@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService){

    }

    /**  Esse metodo sera interceptado por AuthInterceptor, para inserir o cabeçalho na requisicao caso 
        busca clienteDTO no backend por email */
    findByEmail(email: string) {

         // faz requisiao get tipada (ClienteDTO) 
        // passando o parametros para o metodo /email do backend, email e o token
     return this.http.get(
         `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    /** any - tipoglobal aceita qualquer retorno, cp - prefixo da img do cliente
     * recebe o id do cliente e retorna a imagem do bucket
     */
    getImageFromBucket(id : string) : Observable<any> {

        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;

        return this.http.get(url, {responseType : 'blob'}); // blob - tipo img 
    }
    
    /** Insere um cliente  */
    insert(obj: ClienteDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj, //a resposta da requisição vira nesse objeto
            {
                observe: 'response',  // a resposta da requisição vira nesse atributo
                responseType: 'text' // e necessario porque o corpo da requisição vem vazio, isso evita que o json tente fazer o parse e com isso ocorra um erro
            }
        );
    }


}