import { useEsquemaProdutoStore } from './EsquemaProduto';
import { IModelagem, IMedidas, IProduto } from '../interfaces/Produto';
import { IAbaixoDoNome, IBordado, IBordadoNome, ILocalBordado } from '../interfaces/Bordado';
import { defineStore } from 'pinia'
import { useVendaAbertaStore } from './VendaAberta';
import { InjectionKey } from 'vue';




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
      bordados: [] as ILocalBordado[],
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
          bordados: [] as ILocalBordado[],
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
            (this.$state as any)[dado[0]] = JSON.parse(JSON.stringify(dado[1]));
          })
        } else {
          this.$reset()
          const venda = useVendaAbertaStore()
          const id = Math.random()
          this.id = id
        }
      },
      clearMedidas() {
        this.medidas = {} as IMedidas
      },
      setValoresPadroesParaNomeBordado(nomePadrao:string) {
        const bordado_do_nome = {
          nome: nomePadrao as string,
          abaixo_do_nome: {"text":"Sem","font":"Block"} as IAbaixoDoNome,
          fonte: "Monotype" as string,
          cor: "Preto" as string
        }
        this.bordados.push({
          local: 'nome',
          bordado : bordado_do_nome as IBordadoNome
        } as ILocalBordado)
        
        
      },
      copiaProduto(produto:IProduto){
        let novoProduto = {medidas:{},bordados:{},modelagem:{}} as IProduto
        Object.entries(produto).forEach((campo:[string,string|IModelagem|IMedidas|number|boolean|undefined])=>{
          const [key , value] = campo
          if (key == 'modelagem' || key == 'medidas'){
            Object.entries(value as IMedidas|IModelagem).forEach((objMedidasEModelagem)=>{
              const [chave, valor] = objMedidasEModelagem;
              (novoProduto[key] as IMedidas|IModelagem)[chave] = valor
            })
          }else if(key == 'id'){
            const id = Math.random()
            novoProduto.id = id
          }else{
            novoProduto[key] = value
          }
        })
        return novoProduto
      }
    },
    getters: {
     getBordadosSemONome():ILocalBordado[]{
      return this.bordados.filter(bordado => bordado.local != 'nome')
     }
    }
  }
)