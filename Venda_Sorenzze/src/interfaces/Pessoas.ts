export interface IPessoa{
    id : Number
    nome : string
    especialidade : String
    telefone : String
    cpf_cnpj : String
    nascimento : Date
    classificacao : String
    data_de_cadastro : Date
    nucleo : INucleo | undefined
    particao : IParticao | undefined
}


export interface INucleo{
    id: Number
    nome: String
    imagem: String
}


export interface IParticao{}