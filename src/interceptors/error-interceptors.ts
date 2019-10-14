import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../Services/storage.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


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
                case 401:
                    this.handle401();
                    break;
                
                case 403: // localuser estiver invalido
                    this.handle403();
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
    
   
    handle403(){
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};