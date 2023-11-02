import { IBordado, IVenda } from './../interfaces/Interfaces';
import http from "@/http"
import { defineStore } from 'pinia'


export const useAppStore = defineStore('app', {
  state: () => ({
      vendas: [] as IVenda[],
      bordados: [] as IBordado[],
  }),
  getters: {
    getVendas: (state) => state.vendas,
    getBordados: (state) => state.bordados
  },
  actions:{
    async obterBordados (){
      try {
        const resposta = (await http.get('bordados')).data as [IBordado]
        resposta.forEach((bordado: IBordado) => {
          this.bordados.push(bordado)
        }) 
        console.log(this.bordados)
      } catch (error) {
        return error
      }
    }
  }
})


