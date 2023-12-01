export interface IBordados{
    bordado_do_nome: IBordadoNome
    manga_esquerda: IBordado
    manga_direita: IBordado
    outro: {
        contexto: string,
        bordado: IBordado
    },
    [key:string]: IBordado | IBordadoNome | {[key:string]: string|IBordado}
}

export interface IBordadoNome{
    nome: string
    abaixo_do_nome: IAbaixoDoNome
    fonte: string
    cor: string
    [key:string]: string | IAbaixoDoNome
}

export interface IAbaixoDoNome{
    text: string
    font: string
    [key:string]: string
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
