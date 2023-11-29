
import { IPessoa } from "./Pessoas"
import { IProduto } from "./Produto"

export interface IVenda {
    id : Number
    Pessoa: IPessoa
    Tipo: String
    status: string
    data_de_registro: Date|string
    produtos: IProduto[]
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
    frete: ITipoValor,
    desconto: ITipoValor,
    valor_total: number
    [key:string]:number|ITipoValor
}
export interface IAdiantamento{
    valor_pago : number,
    data: Date,
    tipo: string
}

export interface ITipoValor {
    tipo: string,
    valor: number,
    [key:string]:string|number
}
