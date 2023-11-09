import http from "@/http"
import { IBordado } from "@/interfaces/Bordado";
import { IEsquemaProduto} from '@/interfaces/EsquemaProdutos';
import { defineStore } from 'pinia'



export const useEsquemaProdutoStore = defineStore('EsquemaProduto', {
  state: () => ({
    opcoes_de_esquema : [] as String[],
    bordados: [] as IBordado[],
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
    },
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
},
  getters:{
    getBordados: (state) => state.bordados,
    getOpcoes: (state) => state.opcoes_de_esquema,
    getEsquema: (state) => state.esquema_escolhido
  }})