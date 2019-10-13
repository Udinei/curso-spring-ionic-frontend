import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { API_CONFIG } from "../config/api.config";



@Injectable() // permite que essa classe seja injetada em outras classes
export class AuthService {

    constructor(public http: HttpClient) {

    }
   
    // esse metodo recebe o model CredenciaisDTO em creds
    authenticate(creds : CredenciaisDTO) {
        
        // Invocando o metodo Rest post de http e retorna um Observable,
        // recebe  email e senha em creds e informa o objeto que vai receber a respostas e seus atributos (observe e responseType)
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',  // a resposta deve ser um response - vira no headers com o token
                responseType: 'text'  // para o angular nao fazer o parser para json, pois o mesmo vira de corpo vazio
            });
    }
}