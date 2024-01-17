<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-data-table-server ref="tabela" hover height="100%" :row-height="50" :items-length="0" :items="vendas" fixed-footer
        v-model:expanded="expanded" show-expand item-value="id" :headers="tableHeaders" class="mr-4">
        <template #top>
            <PesquisaHeaderTblVendas />
        </template>
        <template v-slot:expanded-row="{ item, columns }">
            <ExpandedRowTblVendas v-bind="{ item: item as IVenda, columns }"></ExpandedRowTblVendas>
        </template>
        <template v-slot:header.id="{ }">
            <p class="text-center">#Nº</p>
        </template>
        <template v-slot:item.id="{ value }">
            <p class="text-center">{{ value }}</p>
        </template>
        <template v-slot:header.pessoaId="{ }">
            <p class="text-center">Pessoa</p>
        </template>
        <template v-slot:item.pessoaId="{ value }">
            <p class="text-center">{{ idPorNome(value) }}</p>
        </template>
        <template v-slot:item.valores="{ value }">
            {{ value.valor_total.toFixed(2) }}
        </template>
        <template v-slot:item.adiantamentos="{ value }">
            {{ somaAdiantamentos(value).toFixed(2) }}
        </template>
    </v-data-table-server>
</template>
  
<script lang="ts">

import { IAdiantamento, IVenda } from '@/interfaces/Venda';
import { useVendasStore } from '@/store/Vendas';
import { usePessoasStore } from "@/store/Pessoas";
import { defineComponent, onMounted, ref } from 'vue';
import PesquisaHeaderTblVendas from './PesquisaHeaderTblVendas.vue';
import ExpandedRowTblVendas from './ExpandedRowTblVendas.vue';

export default defineComponent({
    name: 'TabelaVendas',
    components: {
        PesquisaHeaderTblVendas,
        ExpandedRowTblVendas
    },
    data() {
        return {
            expanded: [],
            tableHeaders: [
                { title: '#Nº', align: 'start', sortable: false, key: 'id' },
                { title: 'Pessoa', align: 'start', sortable: false, key: 'pessoaId' },
                { title: 'Tipo', align: 'center', sortable: false, key: 'tipo' },
                { title: 'Status', align: 'center', sortable: false, key: 'status' },
                { title: 'Data de Registro', align: 'center', sortable: false, key: 'data_de_registro' },
                { title: 'Valores', align: 'end', sortable: false, key: 'valores' },
                { title: 'Adiantamentos', align: 'end', sortable: false, key: 'adiantamentos' },
                { title: '', key: 'data-table-expand', align: 'end', sortable: false },
            ] as unknown as [],

        }
    },
    watch: {
        expanded() {
            if (this.expanded.length > 1)
                this.expanded.shift()
        }
    },
    methods: {
        idPorNome(id: number) {
            let nome = ""
            nome = this.pessoaStore.getNomePorId(id)
            return nome
        },
        somaAdiantamentos(adiantamentos: IAdiantamento[]) {
            let valorTotal = 0 as number
            if (adiantamentos) {
                Object.entries(adiantamentos).forEach((adiantamento: [string, IAdiantamento]) => {
                    valorTotal = valorTotal + adiantamento[1].valor_pago
                })
            }
            return valorTotal
        },
    },
    setup() {
        const vendasStore = useVendasStore()
        const pessoaStore = usePessoasStore()
        const vendas = ref([] as IVenda[])

        onMounted(async () => {
            vendas.value = vendasStore.getVendas
        })

        return {
            pessoaStore,
            vendas
        }
    }
})
</script>


<style lang="scss">
.cardBotoes {
    overflow: hidden
}
</style>
