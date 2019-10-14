export interface ProdutoDTO {
    id: string;
    nome: string;
    preco: number;
    imageUrl?: string; // imageUrl? - pode vir null, o angular só vai rendereizar somente apos se seu conteudo existir 
}