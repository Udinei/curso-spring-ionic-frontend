import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";


export class StorageService {

    // obtem dados do usuario local no storage do browser
    getlocalUser() : LocalUser {
        // obtem  o valor da chave localUser
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        // valida a chave e retorna, o valor da chave ou null
        if(usr == null){
            return null;
        }
        else {
            return JSON.parse(usr);
        }
        
    }
    
    // seta dados do usuario local no storage do browser
    setLocalUser(obj :  LocalUser){
        // se o LocalUser estiver null, limpa o storage, removendo a chave localUser
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        // caso contrario, cria uma chave "localUser" com o valor do obj LocalUser
        else{
            localStorage.setItem(STORAGE_KEYS.localUser,JSON.stringify(obj));

        }
    }
}