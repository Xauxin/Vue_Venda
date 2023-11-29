import { useEsquemaProdutoStore } from './EsquemaProduto';
import { IProduto } from './../interfaces/Produto';
import { IStatus, ITipoValor, IValores} from '@/interfaces/Venda';
import { IPessoa } from '@/interfaces/Pessoas';
import { defineStore } from 'pinia'
import { useVendasStore } from './Vendas';
import { useProdutoAbertoStore } from './ProdutoAberto';
import { usePessoasStore } from './Pessoas';
import { useDate } from 'vuetify/lib/framework.mjs';


export const useVendaAbertaStore = defineStore('VendaAberta', {
  state: () => ({
    id: null as number|null,
    data__de_registro: null as Date|null,
    tipo: "Pedido" as string,
    status: null as IStatus|null,
    pessoaVenda: {} as IPessoa,
    pessoaFoiEscolhida: false as boolean,
    produtos: [] as IProduto[],
    produtoFoiEscolhido: false as boolean,
    valores: {valores_produtos:0} as IValores
  }),
  getters: {
    getId: (state) => state.id,
    getTipoVenda: (state) => state.tipo,
    getpessoaVenda: (state) => state.pessoaVenda,
    getpessoaFoiEscolhida: (state) => state.pessoaFoiEscolhida,
    getProdutos: (state) => state.produtos,
    getProdutosLength: (state) => state.produtos.length,
    getDataEmString():String{
      const date = useDate()
      const data_string = date.format(this.data__de_registro, "keyboardDate").split("/") as String[] || []
      return `${data_string[1]}/${data_string[0]}/${data_string[2]}`
    },
  },
  actions:{
    async AbrirVenda(id?:number){
      if (id){
        console.log('vendacomId')
      }else{
        const pessoas = usePessoasStore()
        const vendas = useVendasStore()
        const esquemas = useEsquemaProdutoStore()
        const produtoAberto = useProdutoAbertoStore()
        await pessoas.listPessoas()
        produtoAberto.abrirProduto()
        esquemas.listEsquemas()
        this.id = vendas.getVendaLength + 1 ,
        this.data__de_registro = new Date()
      }
    },
    setPessoaVenda(pessoaNome:String){
      if(pessoaNome){
        const pessoas = usePessoasStore()
        this.pessoaVenda = pessoas.getPessoaPorNome(pessoaNome)
        this.pessoaFoiEscolhida = true
      }else{
        this.pessoaVenda = {} as IPessoa
        const esquemaStore = useEsquemaProdutoStore()
        const produtoAberto = useProdutoAbertoStore()
        esquemaStore.$reset()
        produtoAberto.$reset()
        produtoAberto.abrirProduto()
        esquemaStore.listEsquemas()
        this.pessoaFoiEscolhida = false
      }
    },
    setTipo(tipo:string){
      this.tipo = tipo
    },
    setProduto(Produto:IProduto){
      Object.entries(Produto).forEach((dado:[string,any])=>{
        const [key,value] = dado
        console.log(key,value)
        if(key == 'valor' && value){
          this.valores.valores_produtos = this.valores.valores_produtos + value
        }
      })
        this.produtos.push(Produto)
        this.calculaTotal()
    },
    setValoresFreteDesconto(valores:IValores){
      Object.entries(valores).forEach((valor:[string,number|ITipoValor])=>{
        const [key, value] = valor
        this.valores[key] = parseInt(value)
      })
      this.calculaTotal()
    },
    calculaTotal(){
      let total = 0 as number
      Object.entries(this.valores).forEach((valor:[string,number|ITipoValor])=>{
        const [key, value] = valor
        console.log(key,value)
        if (key == 'valores_produtos'){
          total = total + (value as number)
        } else if (key == 'frete'  && typeof value === 'object'){
          total = total + (value.valor as number)
        } 
        if (key == 'desconto' && typeof value === 'object'){
          if (value.tipo == 'Porcentagem'){
            const porcentagem = parseFloat(JSON.stringify(value.valor).length == 1 ? `0.0${value.valor}` : `0.${value.valor}`)
            console.log(total * porcentagem)
            if (porcentagem != 100){
                total = total - ( total * porcentagem)          
            }
          }
        }
      })
      console.log(total)
      this.valores.valor_total = total
    }
  }
})


