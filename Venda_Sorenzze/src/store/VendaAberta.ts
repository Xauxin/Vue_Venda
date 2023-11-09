
import { IVenda} from '@/interfaces/Venda';
import { IPessoa } from '@/interfaces/Pessoas';
import http from "@/http"
import { defineStore } from 'pinia'


export const useVendaAberta = defineStore('VendaAberta', {
  state: () => ({
      venda: [] as IVenda[],
      pessoas: [] as IPessoa[]
  }),
  getters: {
    getVendas: (state) => state.venda,
    getPessoas: (state) => state.pessoas
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
    }
  }

})


