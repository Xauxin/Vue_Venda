import { defineStore } from 'pinia'
import { IVenda } from '@/interfaces/Venda';
import http from '@/http';
import { useDate } from 'vuetify/lib/framework.mjs';


export const useVendasStore = defineStore(
  'Vendas',
  {
    state: () => ({
      vendas : [] as IVenda[],
      date: useDate()
    }),
    actions: {
      limpaVendas(){
        this.vendas = []
      },
      async listVendas(){
        try {
          if (this.vendas.length > 0){
            while(this.vendas.length >0){
              this.vendas.pop()
            }
          }
          console.log(this.vendas)
          const resposta = (await http.get("vendas")).data as IVenda[];
          resposta.forEach((venda: IVenda) => {
            const dataFormatada = this.date.format(venda.data_de_registro, 'keyboardDate').split('/')
            venda.data_de_registro =  `${dataFormatada[1]}/${dataFormatada[0]}/${dataFormatada[2]}`
            this.vendas.push(venda);
          });
        } catch (error) {
          return error;
        }
      },
      async createVenda(venda:IVenda){
        console.log(venda)
        await http.post('vendas', venda)
      }
    },
    getters:{
        getVendas: (state) => state.vendas,
        getVendaLength: (state) => state.vendas.length
    } 
    }
)