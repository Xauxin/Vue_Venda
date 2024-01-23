import { useEsquemaProdutoStore } from './EsquemaProduto';
import { IProduto } from './../interfaces/Produto';
import { IStatus, ITipoValor, IValores, IVenda} from '@/interfaces/Venda';
import { IPessoa } from '@/interfaces/Pessoas';
import { defineStore } from 'pinia'
import { useVendasStore } from './Vendas';
import { useProdutoAbertoStore } from './ProdutoAberto';
import { usePessoasStore } from './Pessoas';
import moment from 'moment';
import { IBordado } from '@/interfaces/Bordado';



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
    getIdDoProximoProduto (): number{
      if(!this.produtos){
        return 1
      }
      let maiorId = 0 as number
      this.produtos.forEach(produto => {
        if (produto.id > maiorId){
          maiorId = produto.id
        }
      })
      return maiorId + 1
    },
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
          this.pessoaFoiEscolhida = true
          this.produtoFoiEscolhido =  true
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
        const find = this.produtos.find(produto => produto.id == Produto.id)
        if (find){
          this.produtos = this.produtos.map((produto:IProduto) => {
            if (produto.id === Produto.id){
              return Object.assign({}, Produto) as IProduto
            }
            return produto
          })
        }else{
          this.produtos.push(Object.assign({}, Produto))
        }
        if (this.produtos.length > 0){
          this.produtoFoiEscolhido = true
        }
        const produtoAberto = useProdutoAbertoStore()
        produtoAberto.$reset()
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


