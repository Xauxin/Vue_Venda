<template>
    <v-card class="d-flex flex-column ma-1 pa-0" bordered height="100%">
        <v-card-title class="text-center text-body-1 py-0 tituloCard" color="secondary">Resumo</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <TabelaResumo></TabelaResumo>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions class="py-0">
            <v-btn color="success" variant="flat">Salvar Venda</v-btn>
        </v-card-actions>
    </v-card>
</template>
  
<script lang="ts">

import { IProduto } from '@/interfaces/Produto';
import { useVendaAbertaStore } from '@/store/VendaAberta';
import { ref, watch } from 'vue';
import { defineComponent } from 'vue'
import TabelaResumo from './TabelaResumo.vue'
export default defineComponent({
    name: 'ResumoVenda',
    components:{
        TabelaResumo
    },
    data() {
        return {
            switchFrete: false,
            items: ['Correios', 'Entrega'] as String[],
        }
    },
    methods:{
        multiplica(val1:number, val2:number){
            return val1 * val2 as number
        }
    },
    setup(){
        const vendaAberta = useVendaAbertaStore()
        const produtos = ref([] as IProduto[])
        watch(
            () => vendaAberta.getProdutos,
            () =>{
                produtos.value = vendaAberta.getProdutos
            },
            {deep:true}
        )
        return{
            produtos
        }
    }
})
</script>
  