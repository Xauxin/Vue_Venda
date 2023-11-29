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
        if (this.vendas.length > 0){
          this.vendas = []
        }
        try {
          const resposta = (await http.get("vendas")).data as IVenda[];
          resposta.forEach((venda: IVenda) => {
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