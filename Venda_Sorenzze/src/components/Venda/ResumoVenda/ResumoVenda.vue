<template>
    <v-card class="d-flex flex-column ma-1 pa-0" bordered height="100%">
        <v-card-title class="text-center text-body-1 py-0 tituloCard" color="secondary">Resumo</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <TabelaResumo
            @salvaDesconto="atualizaValores"
            @salvaFrete="atualizaValores"
            ></TabelaResumo>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions class="py-0">
            <v-btn color="success" @click.prevent="salvarVenda" variant="flat">Salvar Venda</v-btn>
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
            console.log(this.vendaAberta.$state)
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
                console.log(this.valores)
                this.vendaAberta.setValoresFreteDesconto(this.valores)
            },
            deep:true
        }
    },
    setup(){
        const vendaAberta = useVendaAbertaStore() as any
        const produtos = ref([] as IProduto[])
        watch(
            () => vendaAberta.getProdutos,
            () =>{
                produtos.value = vendaAberta.getProdutos
            },
            {deep:true}
        )
        return{
            vendaAberta,
            produtos
        }
    }
})
</script>
  