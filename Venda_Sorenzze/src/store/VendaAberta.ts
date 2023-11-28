import { useEsquemaProdutoStore } from './EsquemaProduto';
import { IProduto } from './../interfaces/Produto';
import { IStatus, IVenda} from '@/interfaces/Venda';
import { IPessoa } from '@/interfaces/Pessoas';
import { defineStore } from 'pinia'
import { useVendasStore } from './Vendas';
import { useProdutoAbertoStore } from './ProdutoAberto';
import { usePessoasStore } from './Pessoas';
import { useDate } from 'vuetify/lib/framework.mjs';


export const useVendaAbertaStore = defineStore('VendaAberta', {
  state: () => ({
    id: null as number|null,
    data__de_registro: null as Date|null,
    tipo: null as string|null,
    status: null as IStatus|null,
    vendaAberta: {} as IVenda,
    pessoaVenda: {} as IPessoa,
    pessoaFoiEscolhida: false as boolean,
    produtos: [] as IProduto[],
    produtoFoiEscolhido: false as boolean
  }),
  getters: {
    getId: (state) => state.id,
    getVendas: (state) => state.vendaAberta,
    getpessoaVenda: (state) => state.pessoaVenda,
    getpessoaFoiEscolhida: (state) => state.pessoaFoiEscolhida,
    getProdutos: (state) => state.produtos,
    getProdutosLength: (state) => state.produtos.length,
    getDataEmString():String{
      const date = useDate()
      const data_string = date.format(this.data__de_registro, "keyboardDate").split("/") as String[] || []
      return `${data_string[1]}/${data_string[0]}/${data_string[2]}`
    },
  },
  actions:{
    async AbrirVenda(id?:number){
      if (id){
        console.log('vendacomId')
      }else{
        const pessoas = usePessoasStore()
        const vendas = useVendasStore()
        const esquemas = useEsquemaProdutoStore()
        const produtoAberto = useProdutoAbertoStore()
        await pessoas.listPessoas()
        produtoAberto.abrirProduto()
        esquemas.listEsquemas()
        this.id = vendas.getVendaLength + 1 ,
        this.data__de_registro = new Date()
      }
    },
    setPessoaVenda(pessoaNome:String){
      if(pessoaNome){
        const pessoas = usePessoasStore()
        this.pessoaVenda = pessoas.getPessoaPorNome(pessoaNome)
        this.pessoaFoiEscolhida = true
      }else{
        this.pessoaVenda = {} as IPessoa
        const esquemaStore = useEsquemaProdutoStore()
        const produtoAberto = useProdutoAbertoStore()
        esquemaStore.$reset()
        produtoAberto.$reset()
        produtoAberto.abrirProduto()
        esquemaStore.listEsquemas()
        this.pessoaFoiEscolhida = false
      }
    },

    setProduto(Produto:IProduto){
        this.produtos.push(Produto)
    }
  }
})


