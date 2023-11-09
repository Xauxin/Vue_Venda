
import { IBordados } from "./Bordado"



export interface IProduto {
    [nome: string]: string;
    cor: string;
    tamanho: string;
    Tecido: string;
    modelagem: IModelagem
    medidas: IMedidas
    bordados: IBordados,
    keys: keyof IProduto,
}

export interface IModelagem{
    [nome:string]: string | string[]

}

export interface IMedidas{
    medida: string
}



