export interface IEsquemaProduto{
    id: Number
    nome: String
    tamanhos: [String]
    suprimentos: [String]
    cor: [String]
    modelagem: IEsquemaModelagem
    medidas: IEsquemaMedidas
    mais_medidas: IEsquemaMedidas
    locais_de_bordado: [String]
    valor: Number
    imagem: String
    observacao: String
}

export interface IOpcaoEsquema{
    id: number
    nome: string
}

// export interface ITamanhos{
//     nome: String
//     preco: Number
// }

// export interface ICores{
//     nome: String
//     cores_de_bordado: ICorDeBordado
// }

// export interface ICorDeBordado{
//     nome: String
//     codigo: String
// }

// export interface ISuprimentos{
//     nome: String
//     valor: Number
//     unidade_de_medida: String
//     classificacao: String
//     cores: [ICores]
// }

export interface IEsquemaModelagem{
    [nome: string]: IEsquemaOpcaoModelagem
}

export interface IEsquemaOpcaoModelagem{
    opcoes: { [key: string]: Number };
    required: boolean
    type: string
}

export interface IEsquemaMedidas{
    [nome: string]: IEsquemaConfiguracaoMedidas
}

export interface IEsquemaConfiguracaoMedidas{
    configuracao: { [key: string]: Number };
}

