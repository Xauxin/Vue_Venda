import { IModelagem, IBaseProduto, IMedidas } from './../interfaces/Produto';
import { IBordados } from './../interfaces/Bordado';

import { IProduto } from "@/interfaces/Produto";
import { defineStore } from 'pinia'




export const useProdutoParaVendaStore = defineStore('ProdutoParaVenda', {
  state: () => ({
    produtoASerSalvo: {} as IProduto,
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
        console.log('set', this.baseProduto)
      },
    atualizaNomeCorTamanhoETecido(produto:IBaseProduto){
      const chaves = ['nome', 'cor', 'tamanho', 'tecido'];
      for (const chave in chaves) {
        if (this.baseProduto[chave] !== produto[chave] && chave in this.baseProduto) {
          this.baseProduto[chave] = produto[chave];
        }
      }
      console.log('att', this.baseProduto)
    },
    setModelagem(modelagem: IModelagem) {
      console.log('set',modelagem)
      this.modelagemProduto = modelagem
      this.modelagemFoiEscolhida = true
    },
    setMedidas(medidas: IMedidas){
      console.log('set',medidas)
      this.medidasProduto = medidas
      this.medidasFoiEscolhida = true
    },
    clearMedidas(){
      this.medidasProduto = {}
      console.log('clear',this.medidasProduto)
    },
    
  },
    getters: {
      getprodutoASerSalvo: (state) => state.produtoASerSalvo,
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