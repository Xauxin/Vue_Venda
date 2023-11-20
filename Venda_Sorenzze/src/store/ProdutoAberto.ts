import { IModelagem, IBaseProduto, IMedidas, IProduto} from '../interfaces/Produto';
import { IBordados } from '../interfaces/Bordado';
import { defineStore } from 'pinia'




export const useProdutoAbertoStore = defineStore('ProdutoAberto', {
  state: () => ({

    nomeProdutoFoiEscolhido: false as boolean,
    baseProduto: {} as IBaseProduto,
    baseFoiEscolhida: false as boolean,
    modelagemProduto: {} as IModelagem,
    modelagemFoiEscolhida: false as boolean,
    medidasProduto: {} as IMedidas,
    medidasFoiEscolhida: false as boolean,
    bordadosProduto: {} as IBordados,
    bordadosFoiEscolhida: false as boolean,
    precoProduto: 0 as number,
    quantidadeProduto: 1 as number
  }),
  actions: {
    setNomeCorTamanhoETecido(produto: IBaseProduto) {
        this.baseProduto = produto as IBaseProduto
        this.baseFoiEscolhida = true as boolean
      },
    atualizaNomeCorTamanhoETecido(produto:IBaseProduto){
      console.log('oi2')
      const chaves = ['nome', 'cor', 'tamanho', 'tecido'];
      for (const chave in chaves) {
        if (this.baseProduto[chave] !== produto[chave] && chave in this.baseProduto) {
          this.baseProduto[chave] = produto[chave];
        }
      }
    },
    unsetbaseFoiEscolhida(){
      this.baseFoiEscolhida = false
    },
    setModelagem(modelagem: IModelagem) {
      this.modelagemProduto = modelagem
      this.modelagemFoiEscolhida = true
    },
    setMedidas(medidas: IMedidas){
      this.medidasProduto = medidas
      this.medidasFoiEscolhida = true
    },
    clearMedidas(){
      this.medidasProduto = {}
    },
    setNomeProdutoFoiEscolhido(value:boolean){
      this.nomeProdutoFoiEscolhido = value
    },
    setPrecoEQuantidadeProduto(preco:number, quantidade:number){
      this.precoProduto = preco
      this.quantidadeProduto = quantidade
    }
  },
    getters: {
      getnomeProdutoFoiEScolhido: (state) => state.nomeProdutoFoiEscolhido,
      getbaseProduto: (state) => state.baseProduto,
      getbaseFoiEscolhida: (state) => state.baseFoiEscolhida,
      getmodelagemProduto: (state) => state.modelagemProduto,
      getmodelagemFoiEscolhida: (state) => state.modelagemFoiEscolhida,
      getmedidaProduto: (state) => state.medidasProduto,
      getmedidaFoiEscolhida: (state) => state.medidasFoiEscolhida,
      getbordadosProduto: (state) => state.bordadosProduto,
      getbordadosFoiEscolhida: (state) => state.bordadosFoiEscolhida,
      getPrecoProduto: (state) => state.precoProduto,
      getquantidadeProduto: (state) => state.quantidadeProduto,
      getProdutoInteiro(){
        const produto = {} as IProduto
        if (this.baseFoiEscolhida && this.modelagemFoiEscolhida){
          Object.entries(this.baseProduto).forEach((dado:string[]) =>{
            const [chave, valor] = dado
            chave == 'nome' ? produto.nome = valor.split(' - ')[1] : produto[chave] = valor 
          })
          produto.modelagem = this.modelagemProduto
          produto.preco = this.precoProduto
          produto.quantidade = this.quantidadeProduto
        }
        return produto
      }
    }
  })