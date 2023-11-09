
import { IBordados } from "./Bordado"



export interface IProduto {
    nome: string;
    cor: string;
    tamanho: string;
    tecido: string;
    modelagem: IModelagem;
    medidas: IMedidas;
    bordados: IBordados;
    keys: keyof IProduto,
}

export interface IModelagem{
    [nome:string]: string | string[]

}

export interface IMedidas{
    [medida:string]: string
}

export interface IBaseProduto{
    [nome: string]: string;
    cor: string;
    tamanho: string;
    Tecido: string;
}



