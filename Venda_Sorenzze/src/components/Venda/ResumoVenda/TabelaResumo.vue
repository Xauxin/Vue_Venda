<template>
    <v-card>
        <v-card-title class="text-center text-body-1 py-0 tituloCard">Produtos</v-card-title>
        <v-card-text class="px-0 py-2 mx-0">
            <v-data-table :items="produtos" item-value="name" show-expand :headers="dessertHeaders" class="mr-4"
                height="100%" density="compact" v-model:expanded="expanded">
                <template v-slot:expanded-row="{ columns, item }">
                    <tr>
                        <td :colspan="columns.length">
                            More info about {{ item.name }}
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>
  
<script lang="ts">

import { IProduto } from '@/interfaces/Produto';
import { useVendaAbertaStore } from '@/store/VendaAberta';
import { ref, watch } from 'vue';
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'TabelaResumo',
    data() {
        return {
            switchFrete: false,
            items: ['Correios', 'Entrega'] as String[],
            expanded: [],
            dessertHeaders: [
                { text: 'Dessert (100g serving)', align: 'start', sortable: false, value: 'name' },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Iron (%)', value: 'iron' },
                { text: '', value: 'data-table-expand' },
            ] as  ReadonlyArray<DataTableHeader>
        }
    },
    methods: {
        multiplica(val1: number, val2: number) {
            return val1 * val2 as number
        }
    },

    setup() {
        const vendaAberta = useVendaAbertaStore()
        const produtos = ref([] as IProduto[])
        watch(
            () => vendaAberta.getProdutos,
            () => {
                produtos.value = vendaAberta.getProdutos
            },
            { deep: true }
        )
        return {
            produtos
        }
    }
})
</script>
  