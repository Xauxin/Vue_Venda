export interface IBordados{
    [local:string]: IBordado | IBordadoNome
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
