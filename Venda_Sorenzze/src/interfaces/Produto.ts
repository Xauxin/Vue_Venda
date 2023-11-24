
import { IBordados } from "./Bordado"



export interface IProduto {
    [key: string]: number | string | IModelagem | IMedidas | IBordados | keyof IProduto | boolean | undefined;
    id: number
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
    em_espera: boolean
}

export interface IModelagem{
    [nome:string]: string | string[]

}

export interface IMedidas{
    [medida:string]: string
}





