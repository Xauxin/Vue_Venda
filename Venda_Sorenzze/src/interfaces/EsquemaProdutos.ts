export interface IEsquemaProduto{
    id: Number
    nome: String
    tamanhos: [String]
    suprimentos: [String]
    cor: [String]
    modelagem: {}
    medidas: [String]
    mais_medidas: [String]
    locais_de_bordado: [String]
    valor: Number
    imagem: String
    observacao: String
}

export interface IOpcaoEsquema{
    id: number
    nome: string
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

// Venda {
// 	id: Num
// 	cliente: ICLiente,
// 	tipo: String,
// 	data: date,
// 	Produtos: IProduto: {
// 		nome: String
// 		cor: String
// 		tamanho: String
// 		tecido: string
// 		modelagem: {
// 			Nome_da_modelagem: opcao_escolhida
// 			}
// 		Medida: {
// 			Nome_da_medida: numero medido
// 			}
// 		Bordados{
// 			Nome: {
// 				Fonte: String
// 				cor: String
// 			}
// 			Manga_D: IBordado
// 			Manga_E: IBordado
// 			Outro: IBordado
// 		}
// 		Valor: NUM
// 		Quantidade: Num
// 	}
// 	Valores: Num
// 	Pagamentos {
// 		id: Num
// 		tipo: String
// 		Valor: String
// 	}
// }