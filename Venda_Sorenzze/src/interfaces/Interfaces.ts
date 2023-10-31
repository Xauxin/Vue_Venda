export interface IVenda {
    id : Number
    Cliente: ICliente
    Tipo: String
    Fase: IStatus
    Registro: Date
    Produtos: [IProduto]
    Valores: [IValores]
    Adiantamentos: [IAdiantamentos]
}

export interface ICliente{
    id : Number
    nome : String
    especialidade : String
    telefone : String
    cpf_cnpj : String
    nascimento : Date
    classificacao : String
    data_de_cadastro : Date
    nucleo : INucleo | undefined
    particao : IParticao | undefined
}


export interface IStatus{
    id: number
    opracoes: []
    ordem: number
}
export interface IProduto{
    nome: String
    cor: String
    tamanho: String
    Tecido: String
    modelagems: [IModelagem]
    medidas: IMedidas
    bordados: IBordados
}



export interface IBordados{
    nome: IBordadoNome,
    manga_direita: IBordado
    manga_esquerda: IBordado
    outro: IBordado
}

export interface IBordadoNome{
    nome: String
    fonte: String
    cor: String
}

export interface IBordado {
    Nome: string;
    Estilo: string;
    Núcleo: string;
    Particao: string;
    codigo: string;
    Imagem: string;
    Preço: string;
}

interface IValores{}
interface IAdiantamentos{}
interface INucleo{}
interface IParticao{}
interface IModelagem{}
interface IMedidas{}

