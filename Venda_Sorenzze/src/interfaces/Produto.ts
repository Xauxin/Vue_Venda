
import { IBordados } from "./Bordado"



export interface IProduto {
    nome: string
    cor: string
    tamanho: string
    tecido: string
    modelagem: IModelagem
    medidas: IMedidas
    bordados: IBordados
    valor: number
    quantidade: number
    total: number
    [key: string]: number | string | IModelagem | IMedidas | IBordados | keyof IProduto | undefined;
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



