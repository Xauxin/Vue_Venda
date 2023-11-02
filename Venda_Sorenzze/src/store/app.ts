import { IBordado, IVenda, IPessoa } from './../interfaces/Interfaces';
import http from "@/http"
import { defineStore } from 'pinia'


export const useAppStore = defineStore('app', {
  state: () => ({
      vendas: [] as IVenda[],
      bordados: [] as IBordado[],
      pessoas: [] as IPessoa[]
  }),
  getters: {
    getVendas: (state) => state.vendas,
    getBordados: (state) => state.bordados,
    getPessoas: (state) => state.pessoas
  },
  actions:{
    async listBordados (){
      try {
        const resposta = (await http.get('bordados')).data as [IBordado]
        resposta.forEach((bordado: IBordado) => {
          this.bordados.push(bordado)
        }) 
      } catch (error) {
        return error
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
    }
  }

})


