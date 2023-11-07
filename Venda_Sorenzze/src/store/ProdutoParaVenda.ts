import { IMedidas } from './../interfaces/Produto';
import { IProduto } from "@/interfaces/Produto";
import { defineStore } from 'pinia'


export const useProdutoParaVendaStore = defineStore('ProdutoParaVenda', {
  state: () => ({
    produtos: [] as IProduto[],
    produtoASerSalvo: {} as IProduto
  }),
  actions:{
    setProduto(medidas:IMedidas){
      this.produtoASerSalvo.medidas = medidas
    }
},
  getters:{
    getprodutos: (state) => state.produtos,
    getprodutoASerSalvo: (state) => state.produtoASerSalvo,
    getmodelagemASerSAlva: (state) => state.produtoASerSalvo.modelagems,
    getmedidasASerSAlva: (state) => state.produtoASerSalvo.medidas,
    getbordadosASerSAlva: (state) => state.produtoASerSalvo.bordados
  }})