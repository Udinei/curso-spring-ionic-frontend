import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../Services/storage.service';
import { API_CONFIG } from '../config/api.config';

/** classe utilizada pra inserir o token nas requisições caso exista */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {

    }
        
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log("Passou no interceptor AuthInterceptor");
                
        let localUser = this.storage.getlocalUser();
        // verificando se a requisição é para o endereco da API
        let N = API_CONFIG.baseUrl.length; // obtenha o tamanho da url
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl; // testa se a url que esta vindo na requisicao(req) tem o mesmo tamanho da url da API

        //se existir um usuario token no storage
        if (localUser && requestToAPI) {
            // clona o token do localstorage
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer '+ localUser.token)});
            
            // adiciona ao cabecalho na requisicao
            return next.handle(authReq);
        }
        else {
            // continua o fluxo sem adicionar nada a requisicao 
            return next.handle(req);
        }


        return next.handle(req)
     
       
    }
}

export const AuthInterceptorProvider = { 
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,   // O objeto AuthInterceptorProvider vai usar essa classe na sua execução
    multi: true,
};