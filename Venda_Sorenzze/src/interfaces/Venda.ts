
import { IPessoa } from "./Pessoas"
import { IProduto } from "./Produto"

export interface IVenda {
    id : Number
    Pessoa: IPessoa
    Tipo: String
    status: IStatus
    Registro: Date
    Produtos: IProduto[]
    valores: IValores
    adiantamentos: IAdiantamento[]
}

export interface IStatus{
    id: number
    opracoes: []
    ordem: number
}

export interface IValores{
    valores_produtos: number,
    valor_frete: number,
    desconto: {
        tipo: 'string',
        valor: number,
    }
}
export interface IAdiantamento{
    valor_pago : number,
    data: Date,
    tipo: string
}