import http from "@/http"
import { IEsquemaProduto} from '@/interfaces/EsquemaProdutos';
import { defineStore } from 'pinia'



export const useEsquemaProdutoStore = defineStore('EsquemaProduto', {
  state: () => ({
    opcoes_de_esquema : [] as String[],
    esquema_escolhido: {} as IEsquemaProduto
  }),
  actions:{
    async listOpcoes(){
        try {
            const resposta = (await http.get('esquema_produto')).data as [IEsquemaProduto]
            resposta.forEach((esquema: IEsquemaProduto) =>{
                const esquemaStr = `${esquema.id} - ${esquema.nome}`
                this.opcoes_de_esquema.push(esquemaStr)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async SetEscolhido(escolhido:String){
      try{
        const resposta = (await http.get(`esquema_produto/${escolhido}`)).data as IEsquemaProduto
        this.esquema_escolhido = resposta
      } catch (error){
        console.log(error)
    }
    }
},
  getters:{
    getOpcoes: (state) => state.opcoes_de_esquema,
    getEsquema: (state) => state.esquema_escolhido
  }})