export interface IEsquemaProduto{
    nome: String
    caimento: String
    tamanhos: ITamanhos
    suprimentos: [ISuprimentos]
    modelagem: [IModelagem]
    medidas: [IMedidas]
    medidas_opcionais: [IMedidas]
    valor: Number
    imagem: String
    observacao: String
}

export interface ITamanhos{
    nome: String
    preco: Number
}

export interface ICores{
    nome: String
    cores_de_bordado: ICorDeBordado
}

export interface ICorDeBordado{
    nome: String
    codigo: String
}

export interface ISuprimentos{
    nome: String
    valor: Number
    unidade_de_medida: String
    classificacao: String
    cores: [ICores]
}

export interface IModelagem{
    nome: String
    opcoes: [IOpcaoModelagem]
}

export interface IOpcaoModelagem{
    nome: String
    valor: Number
}

export interface IMedidas{
    nome: String
    Preço: Number
}

