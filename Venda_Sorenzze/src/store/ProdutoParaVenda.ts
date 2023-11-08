
import { IProduto } from "@/interfaces/Produto";
import { defineStore } from 'pinia'




export const useProdutoParaVendaStore = defineStore('ProdutoParaVenda', {
  state: () => ({
    produtos: [] as IProduto[],
    produtoASerSalvo: {} as IProduto,
    produtoJaEscolhido: false as boolean
  }),
  actions: {
    setNomeCorTamanhoETecido(produto: IProduto) {
        this.produtoASerSalvo = produto as IProduto
        this.produtoJaEscolhido = true as boolean
        console.log('set', this.produtoASerSalvo)
      },
    atualizaNomeCorTamanhoETecido(produto:IProduto){
      const chaves = Object.keys(produto) as string[];
      for (const chave in chaves) {
        if (this.produtoASerSalvo[chave] !== produto[chave] && chave in this.produtoASerSalvo) {
          this.produtoASerSalvo[chave] = produto[chave];
        }
      }
      console.log('att', this.produtoASerSalvo)
    }
  },
    getters: {
      getprodutos: (state) => state.produtos,
      getprodutoASerSalvo: (state) => state.produtoASerSalvo,
      getmodelagemASerSAlva: (state) => state.produtoASerSalvo.modelagems,
      getmedidasASerSAlva: (state) => state.produtoASerSalvo.medidas,
      getbordadosASerSAlva: (state) => state.produtoASerSalvo.bordados,
      getprodutoJaEscolhido: (state) => state.produtoJaEscolhido
    }
  })