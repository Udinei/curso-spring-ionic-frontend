import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../Services/storage.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FieldMessage } from '../models/fieldmessage';


/**
 * Os erros são tratados nesse classe mas o redirecionanto é feito no controlador
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, 
                public alertCtrl: AlertController){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log("Passou no interceptor");
        
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch(errorObj.status){
                case 401: // autenticação falhou
                    this.handle401();
                    break;
                
                case 403: // localuser  invalido (null)
                    this.handle403();
                    break;

                case 422: // erro de validação dos campos de formulario
                    this.handle422(errorObj);
                    break;

                default:
                    this.handleDefaultError(errorObj);

            }

            // propaga o erro para o controlador 
            return Observable.throw(errorObj);
        }) as any;
    }
  

    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: fala de autenticacao',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false, // que apertar no botao
            buttons: [
                {
                    text: 'Ok' // texto do botao do alert
                }
             ]
        });

        alert.present();
    }

    
    handle403(){
        this.storage.setLocalUser(null);
    }

    // trata erros de validação, exibindos na tela
    handle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Erro de validação',
            message: this.listErrors(errorObj.errors), // passando a lista de erros
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }
    
    // para cada erro encontrado
    private listErrors(messages : FieldMessage[]) : string {
        let s : string = '';
        // exibe o nome do campo e a mensagem de validação, destacados <strong>
        for (var i=0; i < messages.length; i++){
            s = s + '<p> <strong>' + messages[i].fieldName +
                        '</strong> : ' + messages[i].message +
                    '</p>';
        }
        return s;
    }
  


    handleDefaultError(errorObj){
        let alert = this.alertCtrl.create({
            title: 'Erro :' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false, // que apertar no botao
            buttons: [
                {
                    text: 'Ok' // texto do botao do alert
                }
             ]
        });

        alert.present();
    }
    
   

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};