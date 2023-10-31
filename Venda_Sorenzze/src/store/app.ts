// Utilities
import { IVenda, IAdian } from '@/interfaces/Interfaces'

import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    vendas: [] as IVenda[]
  }),
  getters:{
    getVendas: (state) => state.vendas
  }
})
