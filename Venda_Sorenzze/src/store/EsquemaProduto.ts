import { IEsquemaConfiguracaoMedidas } from './../interfaces/EsquemaProdutos';
import http from "@/http"
import { IBordado, ILocalBordado } from "@/interfaces/Bordado";
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos';
import { defineStore } from 'pinia'

export const useEsquemaProdutoStore = defineStore('EsquemaProduto', {
  state: () => ({
    esquemas: [] as IEsquemaProduto[],
    esquema_escolhido: {} as IEsquemaProduto,
    bordadosList: [] as IBordado[],
  }),
  actions: {
    async listEsquemas() {
      try {
        if (this.esquemas) {
          this.esquemas = []
        }
        this.esquemas = (await http.get('esquema_produto')).data as IEsquemaProduto[]
      } catch (error) {
        console.log(error)
      }
    },
    async setEscolhido(escolhido: String) {
      try {
        if (escolhido == "") {
          this.esquema_escolhido = {} as IEsquemaProduto
        } else {
          this.esquemas.forEach(esquema => {
            if (esquema.nome == escolhido) {
              this.esquema_escolhido = esquema
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async listBordados() {
      try {
        const resposta = (await http.get('bordados')).data as [IBordado]
        resposta.forEach((bordado: IBordado) => {
          this.bordadosList.push(bordado)
        })
      } catch (error) {
        return error
      }
    },
    alteraEsquemaModelagemEscolhida(contexto: string, key: string): void {
      if (contexto == 'add') {
        this.esquema_escolhido.medidas[key] = {} as IEsquemaConfiguracaoMedidas
      } else if (contexto == 'delete') {
        delete this.esquema_escolhido.medidas[key]
      }
    },
    restartEsquemaEscolhido() {
      this.esquema_escolhido = {} as IEsquemaProduto
    },
    locaisDeBordadosRestantes(bordados:({[key:number]:ILocalBordado})) {
      const locaisEscolhidos = [] as string[]
      Object.entries(bordados).forEach((bordado: [string, ILocalBordado]) => {
        const value = bordado[1]
        locaisEscolhidos.push(value.local)
      })
      return this.esquema_escolhido.locais_de_bordado.filter((local) => !(locaisEscolhidos.includes(local as string))) as string[]
    },
  },
  getters: {
    getEsquemaEscolhido: (state) => state.esquema_escolhido,
    getStrListEsquemas(): String[] {
      const strEsquemas = [] as String[]
      this.esquemas.forEach((esquema: IEsquemaProduto) => {
        strEsquemas.push(esquema.nome)
      })
      return strEsquemas
    },
    modelagemObrigatoria() {
      const modelagemObrigatoria = {} as { [key: string]: boolean }
      if (this.esquema_escolhido.nome) {
        Object.entries(this.esquema_escolhido.modelagem).forEach(modelagem => {
          modelagemObrigatoria[modelagem[0]] = modelagem[1].required
        })
        return modelagemObrigatoria
      }
      return {}
    },
    

  }
}
)