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
