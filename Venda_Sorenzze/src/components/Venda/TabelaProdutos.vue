<template>
    <v-sheet align="center" elevation="2" height="100%" class="ma-1">
        <h4>Resumo</h4>
        <v-divider></v-divider>
        <v-sheet align="center" elevation="2" class="ma-1">
            <v-table class="mr-4" height="100%">
                <thead>
                    <tr>
                        <th @click.prevent="console.log(produtos)">Produto</th>
                        <th>Tam</th>
                        <th>Valor</th>
                        <th>Qnt</th>
                        <th>Total</th>
                        <th><v-btn icon="delete"></v-btn></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(produto, index) in produtos" :key="index">
                        <td>{{ produto.nome }}</td>
                        <td>{{ produto.tamanho }}</td>
                        <td>{{ produto.preco }}</td>
                        <td>{{ produto.quantidade }}</td>
                        <td>{{ multiplica(produto.preco as number, produto.quantidade) }}</td>
                        <th><v-row>
                                <v-col cols="6">
                                    <v-btn  size="xsmall" icon="edit"></v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn
                                        size="xsmall" icon="delete"></v-btn>
                                    </v-col>
                            </v-row></th>
                    </tr>
                    <tr>
                        <td><v-switch label="Frete" v-model="switchFrete" color="info"></v-switch></td>
                        <td colspan="3"><v-select density="compact" variant="outlined" auto-select-first hide-details
                                label="Tipo" v-if=switchFrete :items=items></v-select></td>
                        <td colspan="3"><v-text-field density="compact" v-if=switchFrete prefix="R$" variant="outlined"
                                auto-select-first hide-details></v-text-field></td>

                    </tr>
                </tbody>
                <tfoot>
                    <tr>

                    </tr>
                </tfoot>
            </v-table>
        </v-sheet>
    </v-sheet>
</template>
  
<script lang="ts">

import { IProduto } from '@/interfaces/Produto';
import { useVendaAbertaStore } from '@/store/VendaAberta';
import { ref, watch } from 'vue';
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Home',
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
  