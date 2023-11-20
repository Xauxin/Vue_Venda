import { IModelagem, IBaseProduto, IMedidas } from '../interfaces/Produto';
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
    bordadosFoiEscolhida: false as boolean
  }),
  actions: {
    setNomeCorTamanhoETecido(produto: IBaseProduto) {
        this.baseProduto = produto as IBaseProduto
        this.baseFoiEscolhida = true as boolean
      },
    atualizaNomeCorTamanhoETecido(produto:IBaseProduto){
      const chaves = ['nome', 'cor', 'tamanho', 'tecido'];
      for (const chave in chaves) {
        if (this.baseProduto[chave] !== produto[chave] && chave in this.baseProduto) {
          this.baseProduto[chave] = produto[chave];
        }
      }

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
    }
  })