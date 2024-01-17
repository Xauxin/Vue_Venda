import { useEsquemaProdutoStore } from './EsquemaProduto';
import { IProduto } from './../interfaces/Produto';
import { IStatus, ITipoValor, IValores, IVenda} from '@/interfaces/Venda';
import { IPessoa } from '@/interfaces/Pessoas';
import { defineStore } from 'pinia'
import { useVendasStore } from './Vendas';
import { useProdutoAbertoStore } from './ProdutoAberto';
import { usePessoasStore } from './Pessoas';
import moment from 'moment';



export const useVendaAbertaStore = defineStore('VendaAberta', {
  
  state: () => ({
    id: null as number|null,
    data_de_registro: null as Date|null|string,
    tipo: "Pedido" as string,
    status: null as IStatus|null,
    pessoaVenda: {} as IPessoa,
    pessoaFoiEscolhida: false as boolean,
    produtos: [] as IProduto[],
    produtoFoiEscolhido: false as boolean,
    valores: {valores_produtos:0, valor_total:0} as IValores,
    novaVenda: true as boolean
  }),
  getters: {
    getId: (state) => state.id,
    getTipoVenda: (state) => state.tipo,
    getpessoaVenda: (state) => state.pessoaVenda,
    getpessoaFoiEscolhida: (state) => state.pessoaFoiEscolhida,
    getprodutoFoiEscolhido: (state) => state.produtoFoiEscolhido,
    getProdutos: (state) => state.produtos,
    getProdutosLength: (state) => state.produtos.length,
    getTotalVenda: (state) => state.valores.valor_total,
    getData_de_registro: (state) => state.data_de_registro
  },
  actions:{
    async AbrirVenda(id?:number){
      const vendas = useVendasStore()
      const esquemas = useEsquemaProdutoStore()
      const produtoAberto = useProdutoAbertoStore()
      const pessoas = usePessoasStore()
      await pessoas.listPessoas()
      produtoAberto.abrirProduto()
      esquemas.listEsquemas()
      if (id){
        this.novaVenda = false
        const vendaEscolhida = vendas.getVendaPorId(id)
        Object.entries(vendaEscolhida).forEach((campo:[string,any]) => {
          const [key,value] = campo;
          if(key == 'pessoaId'){
            this.setPessoaVenda('',value)
          }
          (this.$state as any)[key] = value
        })
      }else{
        this.id = vendas.getVendaLength + 1 ,
        this.data_de_registro = moment(new Date()).format("DD/MM/YYYY")
      }
    },
    setPessoaVenda(pessoaNome?:String,id?:number){
      const pessoas = usePessoasStore()
      if(pessoaNome){
        this.pessoaVenda = pessoas.getPessoaPorNome(pessoaNome)
        this.pessoaFoiEscolhida = true
      }else if(id){
        this.pessoaVenda = pessoas.getPessoaPorId(id)
        this.pessoaFoiEscolhida = true
      }
      else{
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
        if(key == 'valor' && value){
          this.valores.valores_produtos = this.valores.valores_produtos + value
        }
      })
        this.produtos.push(Produto)
        this.calculaTotal()
        if (this.produtos.length > 0){
          this.produtoFoiEscolhido = true
        }
    },
    setValoresFreteDesconto(valores:IValores){
      Object.entries(valores).forEach((valor:[string,number|ITipoValor])=>{
        const [key, value] = valor
        if (typeof value === 'object')
        this.valores[key] = {valor: value.valor, tipo: value.tipo}
      })
      this.calculaTotal()
    },
    calculaTotal(){
      let total = 0 as number
      Object.entries(this.valores).forEach((valor:[string,number|ITipoValor])=>{
        const [key, value] = valor
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
      this.valores.valor_total = total
    },
    salvaVenda(){
      const venda = {} as IVenda
      Object.entries(this.$state).forEach((dado:[string, any ]) =>{
        let [key, value] = dado
        if(key != 'pessoaFoiEscolhida' && key != 'produtoFoiEscolhido' && key != 'novaVenda'){
          if(key == 'pessoaVenda'){
            key = 'pessoaId'
            value = value.id
          }else if(key == 'data_de_registro'){
            value == this.data_de_registro
          }else if (key == 'valores'){
            if (!value.frete){
              value.frete = {tipo: "", valor: 0}
            }
            if (!value.desconto){
              value.desconto = {tipo: "", valor: 0}
            }
          }
          console.log(key, value);
          (venda as any)[key]= value;
        }
      })
      venda.status = venda.status ? venda.status : 'Aguardando Pagamento'
      const vendas = useVendasStore()
      if (this.novaVenda){
        vendas.createVenda(venda)
      }else{
        vendas.updateVenda(venda)
      }
      this.$reset()
      vendas.limpaVendas()
    }
  }
})


