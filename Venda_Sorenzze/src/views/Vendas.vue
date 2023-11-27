<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-data-table :row-height="50"
                hover 
                :items="vendas" 
                fixed-footer 
                v-model:expanded="expanded"
                show-expand 
                item-value="id" 
                :headers="tableHeaders"
                class="mr-4"
                height="fit-content" >
        <template v-slot:expanded-row="{ columns, item }">
                    <tr>
                        <td :colspan="columns.length">
                            <p v-for="(produto, index) in item.Produtos" :key="index">{{ produto.nome }}</p>
                        </td>
                    </tr>
                </template>
        <template v-slot:item.PessoaId="{ value }">
            {{ idPorNome(value) }}
        </template>
        <template v-slot:item.Status="{ value }">
             Entregue 
        </template>
        <template v-slot:item.valores="{ value }">
            {{ parseFloat(value.valores_produtos).toFixed(2) }}
        </template>
        <template v-slot:item.adiantamentos="{ value }">
            {{ parseFloat(value.valor_pago).toFixed(2)  }}
        </template>
        

    </v-data-table>
</template>
  
<script lang="ts">

import { IVenda } from '@/interfaces/Venda';
import { useVendasStore } from '@/store/Vendas';
import { usePessoasStore } from "@/store/Pessoas"
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
    name: 'Vendas',
    components: {

    },
    data() {
        return {
            expanded: [],
            tableHeaders: [
                { title: '#Nº',align: 'start', sortable: false, key: 'id'},
                { title: 'Pessoa', align: 'start', sortable: false, key: 'PessoaId' },
                { title: 'Tipo', align: 'center', sortable: false, key: 'Tipo' },
                { title: 'Status', align: 'center', sortable: false, key: 'Status' },
                { title: 'Data de Registro', align: 'center', sortable: false, key: 'Registro' },
                { title: 'Valores', align: 'end', sortable: false, key: 'valores' },
                { title: 'Adiantamentos', align: 'end', sortable: false, key: 'adiantamentos' },
                { title: '', key: 'data-table-expand', align: 'end', sortable: false },
                

            ] as unknown as []
        }
    },
    methods:{
        idPorNome(id:number){
            let nome = ""
            nome = this.pessoaStore.getNomePorId(id)
            console.log(nome, id)
            return nome
        }
    },
    setup() {
        const vendasStore = useVendasStore()
        const pessoaStore = usePessoasStore()
        const vendas = ref([] as IVenda[])
        onMounted(async () => {
            await vendasStore.listVendas()
            await pessoaStore.listPessoas()
            vendas.value = vendasStore.getVendas
            console.log(vendas.value)
        }
        )
        return {
            pessoaStore,
            vendas
        }
    }
})
</script>

