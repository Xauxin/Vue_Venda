
import { IPessoa } from "./Pessoas"
import { IProduto } from "./Produto"

export interface IVenda {
    id : Number
    Pessoa: IPessoa
    Tipo: String
    Fase: IStatus
    Registro: Date
    Produtos: [IProduto]
    Valores: [IValores]
    Adiantamentos: [IAdiantamentos]
}

export interface IStatus{
    id: number
    opracoes: []
    ordem: number
}

export interface IValores{}
export interface IAdiantamentos{}