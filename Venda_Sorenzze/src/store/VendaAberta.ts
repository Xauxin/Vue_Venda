import { IProduto } from './../interfaces/Produto';
import { IVenda} from '@/interfaces/Venda';
import { IPessoa } from '@/interfaces/Pessoas';
import http from "@/http"
import { defineStore } from 'pinia'
import { useVendaStore } from './Vendas';
import { useProdutoAbertoStore } from './ProdutoAberto';


export const useVendaAbertaStore = defineStore('VendaAberta', {
  state: () => ({
    pessoas: [] as IPessoa[],
    vendaAberta: {} as IVenda,
    pessoaVenda: {} as IPessoa,
    pessoaFoiEscolhida: false as boolean,
    produtos: [] as IProduto[],
    produtoFoiEscolhido: false as boolean
  }),
  getters: {
    getVendas: (state) => state.vendaAberta,
    getPessoas: (state) => state.pessoas,
    getpessoaVenda: (state) => state.pessoaVenda,
    getpessoaFoiEscolhida: (state) => state.pessoaFoiEscolhida,
    getProdutos: (state) => state.produtos,
    getProdutosLength: (state) => state.produtos.length
  },
  actions:{
    async AbrirVenda(id?:number){
      if (id){
        console.log('vendacomId')
      }else{
        await this.listPessoas()
        const vendas = useVendaStore()
        this.vendaAberta.id = vendas.getVendaLength + 1
        const produAberto = useProdutoAbertoStore()
        produAberto.abrirProduto
      }
    },
    async listPessoas(){
      try {
        const resposta = (await http.get('pessoas')).data as [IPessoa]
        resposta.forEach((pessoa: IPessoa)=>{
          pessoa.data_de_cadastro = new Date(pessoa.data_de_cadastro)
          pessoa.nascimento = new Date(pessoa.nascimento)
          this.pessoas.push(pessoa)
      })} catch (error) {
        return error
      }
    },
    setPessoaVenda(pessoaNome:String){
      if(pessoaNome){
        this.pessoas.forEach((pessoa:IPessoa)=> {
          if (pessoa.nome == pessoaNome){
            this.pessoaVenda = pessoa
            this.pessoaFoiEscolhida = true
          }
        })
      }else{
        this.pessoaVenda = {} as IPessoa
        this.pessoaFoiEscolhida = false
      }
    },
    setProduto(Produto:IProduto){
        const id = this.produtos[this.produtos.length - 1].id + 1
        Produto.id = id
        this.produtos.push(Produto)
    }
  }
})


