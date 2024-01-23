import { useEsquemaProdutoStore } from './EsquemaProduto';
import { IModelagem, IMedidas, IProduto } from '../interfaces/Produto';
import { IAbaixoDoNome, IBordados } from '../interfaces/Bordado';
import { defineStore } from 'pinia'
import { useVendaAbertaStore } from './VendaAberta';




export const useProdutoAbertoStore = defineStore(
  'ProdutoAberto',
  {
    state: () => ({
      id: null as null | number,
      nome: "" as string,
      cor: "" as string,
      tamanho: "" as string,
      tecido: "" as string,
      modelagem: {} as IModelagem,
      medidas: {} as IMedidas,
      bordados: {} as IBordados,
      valor: 0 as number,
      quantidade: 1 as number,
      em_espera: false as boolean
    }),
    actions: {
      resetexcludente(arrayDeCampos: string[]) {
        const stadoInicial = {
          id: null as null | number,
          nome: "" as string,
          cor: "" as string,
          tamanho: "" as string,
          tecido: "" as string,
          modelagem: {} as IModelagem,
          medidas: {} as IMedidas,
          bordados: {} as IBordados,
          valor: 0 as number,
          quantidade: 1 as number,
          em_espera: false as boolean
        } as IProduto
        Object.entries(this.$state as any).forEach((campo: [string, any]) => {
          const key = campo[0]
          if (!arrayDeCampos.includes(key)) {
            (this.$state as any)[key] = stadoInicial[key]
          }
        })
      },
      abrirProduto(produto?: IProduto) {
        if (produto) {
          Object.entries(produto).forEach((dado: [string, any]) => {
            (this.$state as any)[dado[0]] = dado[1];
          })
        } else {
          const venda = useVendaAbertaStore()
          this.$state.id = venda.getIdDoProximoProduto
        }
      },
      clearMedidas() {
        this.medidas = {} as IMedidas
      },
      setValoresPadroesParaNomeBordado(nomePadrao:string) {
        this.bordados.bordado_do_nome = {
          nome: nomePadrao as string,
          abaixo_do_nome: {"text":"Sem","font":"Block"} as IAbaixoDoNome,
          fonte: "Monotype" as string,
          cor: "Preto" as string
        }
      }
    },
    getters: {
      getNome: (state) => state.nome,
      getCor: (state) => state.cor,
      getTamanho: (state) => state.tamanho,
      getTecido: (state) => state.tecido,
      getModelagem: (state) => state.modelagem,
      getMedidas: (state) => state.medidas,
      getBordados: (state) => state.bordados,
      getValor: (state) => state.valor,
      getQuantidade: (state) => state.quantidade,
    }
  }
)