import { useEsquemaProdutoStore } from './EsquemaProduto';
import { IModelagem, IMedidas, IProduto} from '../interfaces/Produto';
import { IBordados } from '../interfaces/Bordado';
import { defineStore } from 'pinia'
import { useVendaAbertaStore } from './VendaAberta';




export const useProdutoAbertoStore = defineStore(
  'ProdutoAberto',
  {
    state: () => ({
      id : 1,
      nome: "" as string,
      nomeFoiEscolhido: false as boolean,
      cor: "" as string,
      tamanho: "" as string,
      tecido: "" as string,
      baseFoiEscolhida: false as boolean,
      modelagem: {} as IModelagem,
      modelagemFoiEscolhida: false as boolean,
      medidas: {} as IMedidas,
      bordados: {} as IBordados,
      valor: 0 as number,
      quantidade: 1 as number,
      em_espera: false as boolean
    }),
    actions: {
      abrirProduto(produto?:IProduto){
        if(produto){
          Object.entries(produto).forEach((dado:[string, any ]) =>{
            (this.$state as any)[dado[0]]= dado[1];
          })
        }else{
          const venda = useVendaAbertaStore()
          this.$state.id = venda.getProdutosLength + 1
        }
      },
      setter(campo:string, valor: string|IModelagem|IMedidas|IBordados|number){
        (this.$state as any)[campo] = valor
        if (this.nome){
          this.nomeFoiEscolhido = true
          if ( this.cor && this.tamanho && this.tecido){
            this.baseFoiEscolhida = true
          }else{
            this.baseFoiEscolhida = false
          }
          if (Object.values(this.modelagem).length != 0) {
            this.modelagemFoiEscolhida = true
          }else{
            this.modelagemFoiEscolhida = false
          }
        }
      },
      salvaProduto(){
        const produto = {} as IProduto
        Object.entries(this.$state).forEach((dado:[string, any ]) =>{
          const [key, value] = dado
          if(key != 'nomeFoiEscolhido' && key != 'baseFoiEscolhida' && key != 'modelagemFoiEscolhida')
            produto[key]= value;
        })
        const venda = useVendaAbertaStore()
        const esquema = useEsquemaProdutoStore()
        venda.setProduto(produto)
        this.$reset()
        this.abrirProduto()
        esquema.restartEsquemaEscolhido()
      },
      clearMedidas(){
        this.medidas = {} as IMedidas
      }
    },
    getters: {
      getNome: (state) => state.nome,
      getNomeFoiEscolhido: (state) => state.nomeFoiEscolhido,
      getCor: (state) => state.cor,
      getTamanho: (state) => state.tamanho,
      getTecido: (state) => state.tecido,
      getBaseFoiEscolhida: (state) => state.baseFoiEscolhida,
      getModelagem: (state) => state.modelagem,
      getModelagemFoiEscolhida: (state) => state.modelagemFoiEscolhida,
      getMedidas: (state) => state.medidas,
      getBordados: (state) => state.bordados,
      getValor: (state) => state.valor,
      getQuantidade: (state) => state.quantidade,
    }
  }
)