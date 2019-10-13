import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";



@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService){

    }

    // busca clienteDTO no backend por email
    findByEmail(email: string) : Observable<ClienteDTO> {

        // obtem o token gravado no storage
        let token = this.storage.getlocalUser().token;

        // cria um headers com o conteudo token Athorization, que esta no storage
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        // faz requisiao get tipada (ClienteDTO) 
        // passando o parametros para o metodo /email do backend, email e o token
        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            {'headers' : authHeader}); // passando o cabeçalho pra requisicao

    }

    /** any - tipoglobal aceita qualquer retorno, cp - prefixo da img do cliente
     * recebe o id do cliente e retorna a imagem do bucket
     */
    getImageFromBucket(id : string) : Observable<any> {

        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;

        return this.http.get(url, {responseType : 'blob'}); // blob - tipo img 
    }
}