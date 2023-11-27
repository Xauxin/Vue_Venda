import { defineStore } from 'pinia'
import { IVenda } from '@/interfaces/Venda';
import http from '@/http';





export const useVendasStore = defineStore(
  'Vendas',
  {
    state: () => ({
      vendas : [] as IVenda[]
    }),
    actions: {
      async listVendas(){
        try {
          const resposta = (await http.get("vendas")).data as IVenda[];
          resposta.forEach((venda: IVenda) => {
            this.vendas.push(venda);
          });
        } catch (error) {
          return error;
        }
      }
    },
    getters:{
        getVendas: (state) => state.vendas,
        getVendaLength: (state) => state.vendas.length
    } 
    }
)