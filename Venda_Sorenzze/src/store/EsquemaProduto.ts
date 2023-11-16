import { IEsquemaConfiguracaoMedidas } from './../interfaces/EsquemaProdutos';
import http from "@/http"
import { IBordado } from "@/interfaces/Bordado";
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos';
import { defineStore } from 'pinia'



export const useEsquemaProdutoStore = defineStore('EsquemaProduto', {
  state: () => ({
    opcoes_de_esquema: [] as String[],
    esquema_escolhido: {} as IEsquemaProduto,
    bordados: [] as IBordado[],
  }),
  actions: {
    async listOpcoes() {
      try {
        if (this.opcoes_de_esquema){
          this.opcoes_de_esquema = []
        }
        const resposta = (await http.get('esquema_produto')).data as [IEsquemaProduto]
        resposta.forEach((esquema: IEsquemaProduto) => {
          const esquemaStr = `${esquema.id} - ${esquema.nome}`
          this.opcoes_de_esquema.push(esquemaStr)
        })
      } catch (error) {
        console.log(error)
      }
    },
    async SetEscolhido(escolhido: String) {
      try {
        const resposta = (await http.get(`esquema_produto/${escolhido}`)).data as IEsquemaProduto
        this.esquema_escolhido = resposta
      } catch (error) {
        console.log(error)
      }
    },
    async listBordados() {
      try {
        const resposta = (await http.get('bordados')).data as [IBordado]
        resposta.forEach((bordado: IBordado) => {
          this.bordados.push(bordado)
        })
      } catch (error) {
        return error
      }
    },
    alteraEsquemaModelagemEscolhida(contexto: string, key: string) {
      if (contexto == 'add') {
        this.esquema_escolhido.medidas[key] = {} as IEsquemaConfiguracaoMedidas
      } else if (contexto == 'delete') {
        delete this.esquema_escolhido.medidas[key]
      }
    },
  },
  getters: {
    getBordados: (state) => state.bordados,
    getOpcoesDeEsquema: (state) => state.opcoes_de_esquema,
    getEsquema: (state) => state.esquema_escolhido
  }
})