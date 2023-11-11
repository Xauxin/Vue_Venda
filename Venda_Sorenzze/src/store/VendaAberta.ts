import { IVenda} from '@/interfaces/Venda';
import { IPessoa } from '@/interfaces/Pessoas';
import http from "@/http"
import { defineStore } from 'pinia'


export const useVendaAbertaStore = defineStore('VendaAberta', {
  state: () => ({
    pessoas: [] as IPessoa[],
    vendaAberta: [] as IVenda[],
    pessoaVenda: {} as IPessoa,
    pessoaFoiEscolhida: false as boolean 
  }),
  getters: {
    getVendas: (state) => state.vendaAberta,
    getPessoas: (state) => state.pessoas,
    getpessoaVenda: (state) => state.pessoaVenda,
    getpessoaFoiEscolhida: (state) => state.pessoaFoiEscolhida
  },
  actions:{
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
        this.pessoas.forEach(pessoa => {
          if (pessoa.nome == pessoaNome){
            this.pessoaVenda = pessoa
            console.log('set',this.getpessoaVenda)
            this.pessoaFoiEscolhida = true
          }
        })
      }else{
        this.pessoaVenda = {} as IPessoa
        this.pessoaFoiEscolhida = false
      }
    }
  }
})


