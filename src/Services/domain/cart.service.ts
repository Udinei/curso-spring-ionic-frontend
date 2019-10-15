import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";


@Injectable()
export class CartService{

    constructor (public storage: StorageService){

    }

    createOrClearCart() : Cart {
        let cart: Cart = {items: []}; // limpa o carrinho
        this.storage.setCart(cart); // seta o carrinho no storage
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storage.getCart(); // recupera o cart do storage
        if(cart == null){ // se não existir um cart no storage
            cart = this.createOrClearCart(); // cria
       }
       return cart; // retorna o cart criado
    }

    addProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        // procura um produto na lista, e retorna em qual posição esta o produto na list        
        let position = cart.items.findIndex(x => x.produto.id  == produto.id );

        // ele nao foi encontrado
        if(position == -1){
            cart.items.push({quantidade: 1, produto: produto}); // adiciona o produto na lista
        }
        this.storage.setCart(cart);
        return cart;
        
    }

    removeProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        // procura um produto na lista, e retorna em qual posição esta o produto na list
        let position = cart.items.findIndex(x => x.produto.id  == produto.id );

        // se ele foi encontrado na lista
        if(position !== -1){
            cart.items.splice(position, 1); // remove o item produto da lista
        }
        this.storage.setCart(cart);
        return cart;
        
    }

    /** Adiciona mais um produto no carrinho */
    increaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        // procura um produto na lista, e retorna em qual posição esta o produto na list
        let position = cart.items.findIndex(x => x.produto.id  == produto.id );

        // se ele foi encontrado na lista
    if(position !== -1){
            cart.items[position].quantidade++; // incrementa mais um  o item produto na lista
        }
        this.storage.setCart(cart);
        return cart;
   }

   /** remove um produto no carrinho */
   decreaseQuantity(produto: ProdutoDTO) : Cart {
    let cart = this.getCart();
    // procura um produto na lista, e retorna em qual posição esta o produto na list
    let position = cart.items.findIndex(x => x.produto.id  == produto.id );

    // se ele foi encontrado na lista
    if(position !== -1){
        cart.items[position].quantidade--; // decrementa um  o item produto na lista

        // se o usuario clicou para remover um produto com quantidade atual = 1 então remove o produto do carrinho
        if(cart.items[position].quantidade < 1){
            cart = this.removeProduto(produto); //remove o produto do carinho
        }
    }
    this.storage.setCart(cart);
    return cart;
}

   /** Valor total dos produtos no carrinho */
   total(): number {
       let cart = this.getCart();
       let sum = 0;
       
       for (var i=0; i<cart.items.length; i++){
           // totaliza o valor dos items no carrinho 
           sum += cart.items[i].produto.preco * cart.items[i].quantidade;
       }

       return sum;
   }


}