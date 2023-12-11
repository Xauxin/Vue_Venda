
import { defineStore } from 'pinia'
import { IVenda } from '@/interfaces/Venda';
import http from '@/http';
import moment from 'moment';


export const useVendasStore = defineStore(
  'Vendas',
  {
    state: () => ({
      vendas : [] as IVenda[],
      ultimaVendaAdicionada: {} as IVenda,
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
            const dataFormatada = moment(venda.data_de_registro).format('DD/MM/YYYY')
            venda.data_de_registro =  dataFormatada
            this.vendas.push(venda);
          });
        } catch (error) {
          console.log(error)
        }
      },
      async createVenda(venda:IVenda){
        try{
          await http.post('vendas', venda)
          this.ultimaVendaAdicionada = venda
        }catch(erro){
          console.log(erro)
        }
      },
      getVendaPorId(id:number){
        let vendaComOId = {} as IVenda 
        this.vendas.forEach(venda => {
          if (venda.id == id){
            vendaComOId = venda
          }
        })
        return vendaComOId
      },
    },
    getters:{
        getUltimaVendaAdicionada: (state) => state.ultimaVendaAdicionada,
        getVendas: (state) => state.vendas,
        getVendaLength: (state) => state.vendas.length
    } 
    }
)