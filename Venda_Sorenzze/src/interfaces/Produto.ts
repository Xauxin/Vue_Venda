import { IBordados } from "./Bordado"

export interface IProduto{
    nome: String
    cor: String
    tamanho: String
    Tecido: String
    modelagems: [IModelagem]
    medidas: IMedidas
    bordados: IBordados
}

export interface IModelagem{
    [nome: string]: string
    opcao_escolhida: string
}

export interface IMedidas{
    [nome: string]: string
    ajuste: string
}

