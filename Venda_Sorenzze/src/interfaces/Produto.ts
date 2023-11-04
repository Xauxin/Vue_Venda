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

