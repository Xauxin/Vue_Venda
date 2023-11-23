import { defineStore } from 'pinia'
import { IVenda } from '@/interfaces/Venda';




export const useVendaStore = defineStore(
  'Vendas',
  {
    state: () => ({
      vendas : [] as IVenda[]
    }),
    actions: {
    },
    getters:{
        getVendas: (state) => state.vendas,
        getVendaLength: (state) => state.vendas.length
    } 
    }
)