export interface IBordados{
    [local:string]: IBordado | IBordadoNome
}

export interface IBordadoNome{
    nome: string
    fonte: string
    cor: string
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
