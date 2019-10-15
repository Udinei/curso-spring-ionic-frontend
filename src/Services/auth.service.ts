import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local_user";
import { JwtHelper } from "angular2-jwt";
import { CartService } from "./domain/cart.service";



@Injectable() // permite que essa classe seja injetada em outras classes
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient,
        public storage: StorageService,
        public cartService: CartService) {

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

     /** Esse metodo atualiza o token automaticamente, sempre que o usuario estiver logado
      e usar outras funcionalidades da app */
     refreshToken() {
       // Invocando o metodo Rest post de http e retorna um Observable,
       // recebe  email e senha em creds e informa o objeto que vai receber a respostas e seus atributos (observe e responseType)
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {},
            {
                observe: 'response',  // a resposta deve ser um response - vira no headers com o token
                responseType: 'text'  // para o angular nao dar erro de parser, pois o mesmo vira de corpo vazio
            });
    }



    /** Obtem o token e armazena  no localStorage */
    sucessfullLogin(authorizationValue : String){
        // obtem somente os caracteres token apos a palavra Barer 
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.cartService.createOrClearCart();
    }

    // remove o token do usuario do storage
    logout(){
        this.storage.setLocalUser(null);
    }


}