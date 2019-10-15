import { EstadoDTO } from "./estado.dto";

export interface CidadeDTO {
    id: string;
    nome: string;
    estado?: EstadoDTO  // para que ao montar a cidade venha o estado associado a ela
}