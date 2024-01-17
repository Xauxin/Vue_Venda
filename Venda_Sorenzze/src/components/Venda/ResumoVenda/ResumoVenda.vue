<template>
    <v-card class="d-flex flex-column ma-1 pa-0" bordered height="100%">
        <v-card-title class="text-center text-body-1 py-0 tituloCard" color="secondary" @click="console.log(vendaAberta.$state)">Resumo</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <TabelaResumo
            @salvaDesconto="atualizaValores"
            @salvaFrete="atualizaValores"
            ></TabelaResumo>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions class="py-0">
            <v-btn color="success" :disabled="!vendaValida" @click.prevent="salvarVenda" to="/vendas" variant="flat">Salvar Venda</v-btn>
        </v-card-actions>
    </v-card>
</template>
  
<script lang="ts">

import { IProduto } from '@/interfaces/Produto';
import { useVendaAbertaStore } from '@/store/VendaAberta';
import { ref, watch } from 'vue';
import { defineComponent } from 'vue'
import TabelaResumo from './TabelaResumo.vue'
import { IValores, ITipoValor } from '@/interfaces/Venda';
export default defineComponent({
    name: 'ResumoVenda',
    components:{
        TabelaResumo
    },
    data() {
        return {
            valores : {} as IValores
        }
    },
    methods:{
        multiplica(val1:number, val2:number){
            return val1 * val2 as number
        },
        salvarVenda(){
            console.log(this.vendaValida)
            if (this.vendaValida){
                this.vendaAberta.salvaVenda()
            }
        },
        atualizaValores(objeto:ITipoValor){
            if (objeto.tipo == 'Porcentagem' || objeto.tipo == 'Valor'){
                this.valores.desconto = objeto 
            }else{
                this.valores.frete = objeto 
            }
        }
    },
    watch:{
        valores:{
            handler(){
                this.vendaAberta.setValoresFreteDesconto(this.valores)
            },
            deep:true
        }
    },
    setup(){
        const vendaAberta = useVendaAbertaStore()
        const produtos = ref([] as IProduto[])
        const vendaValida = ref(false as boolean)
        watch(
            () => vendaAberta.getProdutos,
            () =>{
                produtos.value = vendaAberta.getProdutos
            },
            {deep:true}
        )
        watch(
            ([()=> vendaAberta.getpessoaFoiEscolhida, ()=> vendaAberta.getprodutoFoiEscolhido]),([newpessoa, newproduto]) => {
                if (newpessoa && newproduto) {
                    vendaValida.value = true
                }else{
                    vendaValida.value = false
                }
            },
            {deep: true})
        return{
            vendaAberta,
            vendaValida,
            produtos
        }
    }
})
</script>
  