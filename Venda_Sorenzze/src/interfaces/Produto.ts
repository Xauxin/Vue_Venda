
import { IBordados } from "./Bordado"

interface produtoComChave{
    [chave: string]: string;
}

export interface IProduto extends produtoComChave{
    nome: string;
    cor: string;
    tamanho: string;
    Tecido: string;
    modelagems: [IModelagem]
    medidas: IMedidas
    bordados: IBordados,
    keys: keyof IProduto
}

export interface IModelagem{
    [nome: string]: string
    opcao_escolhida: string
}

export interface IMedidas{
    [medida: string]: string

}



