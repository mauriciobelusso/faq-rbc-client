import { Marca } from './marca';
import { Categoria } from './categoria';

export class Produto {
    id: number;
    nome: string;
    descricao: string;
    valor: number;    
    categoria: Categoria;
    marca: Marca;
}
