<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-data-table-server :row-height="50" :items-length="0" :items="vendas" fixed-footer v-model:expanded="expanded"
        show-expand item-value="id" :headers="tableHeaders" class="mr-4" height="fit-content">
        <template v-slot:expanded-row="{ item, columns }">
            <td class="pa-1" :colspan="columns.length">
                <v-row no-gutters aling="top">
                    <v-col cols="6">
                        <v-card class="ma-1 pa-1">
                            <v-card-title class="text-center text-caption pa-0">
                                Produtos
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text class="pa-0 ma-0">
                                <v-list density="compact" :items="item.Produtos">
                                    <template v-slot:title="{ item }">
                                        <div>{{ `${item.nome} - ${item.cor}` }}</div>
                                    </template>
                                    <template v-slot:append="{ item }">
                                        <div>{{ item.tamanho }}</div>
                                    </template>
                                </v-list>

                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="3">
                        <v-card class="ma-1 pa-1">
                            <v-card-title class="text-center text-caption pa-0">
                                Valores
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text class="pa-0 ma-0">
                                <v-list density="compact" :items="item.Produtos">
                                    <template v-slot:append="{ item }">
                                        <div>R${{ item.preco }},00</div>
                                    </template>
                                </v-list>
                                <v-divider></v-divider>
                                <v-list density="compact">
                                    <v-list-item>
                                        <template #append>
                                            <div>R${{ item.valores.valores_produtos }},00</div>
                                        </template>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="2">
                        <v-card class="ma-1 pa-1">
                            <v-card-title class="text-center text-caption pa-0">
                                Pagamentos
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text></v-card-text>

                        </v-card>
                    </v-col>
                    <v-col cols="1">
                        <v-card class="ma-1 pa-1">
                            <v-card-title class="text-center text-caption pa-0">
                                <v-spacer></v-spacer>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text class="ma-0 pa-0">
                                <v-list density="compact">
                                    <v-list-item class="text-center"><v-btn @ ="console.log('hover')" icon="edit" density="comfortable" rounded class="px-6"
                                            variant="tonal"></v-btn></v-list-item>
                                    <v-list-item class="text-center"><v-btn icon="receipt_long" rounded  density="comfortable"
                                            variant="tonal"></v-btn></v-list-item>
                                    <v-list-item class="text-center"><v-btn icon="print" rounded  density="comfortable"
                                            variant="tonal"></v-btn></v-list-item>
                                    <v-list-item class="text-center">
                                        <v-menu v-model="menuMaisOpcoesPedido" :close-on-content-click="false"
                                            location="center">
                                            <template v-slot:activator="{ props }">
                                                <v-btn  v-bind="props" variant="tonal" rounded
                                                density="comfortable" icon="more_horiz">
                                                </v-btn>
                                            </template>
                                            <v-card>
                                                <v-card-text class="ma-0 pa-1">
                                                    <v-row no-gutters>
                                                       <v-col  class="ma-0 pa-1" cols="4"><v-btn icon="delete" variant="tonal" size="small" rounded ></v-btn></v-col>
                                                       <v-col  class="ma-0 pa-1" cols="4"><v-btn icon="picture_as_pdf" variant="tonal" size="small" rounded ></v-btn></v-col>
                                                       <v-col  class="ma-0 pa-1" cols="4"><v-btn icon="person" variant="tonal" size="small" rounded ></v-btn></v-col>
                                                    </v-row>
                                                    <v-row no-gutters>
                                                       <v-col  class="ma-0 pa-1" cols="4"><v-btn icon="content_copy" variant="tonal" size="small" rounded ></v-btn></v-col>
                                                       <v-col  class="ma-0 pa-1" cols="4"><v-btn icon="description" variant="tonal" size="small" rounded ></v-btn></v-col>
                                                       <v-col  class="ma-0 pa-1" cols="4"><v-btn icon="" variant="tonal" size="small" rounded ></v-btn></v-col>
                                                    </v-row>
                                                    <v-row no-gutters>
                                                        <v-col  class="ma-0 pa-1" cols="4"><v-btn icon="" variant="tonal" size="small" rounded ></v-btn></v-col>
                                                        <v-col  class="ma-0 pa-1" cols="4"><v-btn icon="" variant="tonal" size="small" rounded ></v-btn></v-col>
                                                        <v-col  class="ma-0 pa-1" cols="4"><v-btn icon="" variant="tonal" size="small" rounded ></v-btn></v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-menu>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </td>
        </template>
        <template v-slot:item.PessoaId="{ value }">
            {{ idPorNome(value) }}
        </template>
        <template v-slot:item.Status="{ }">
            Entregue
        </template>
        <template v-slot:item.valores="{ value }">
            {{ parseFloat(value.valores_produtos).toFixed(2) }}
        </template>
        <template v-slot:item.adiantamentos="{ value }">
            {{ parseFloat(value.valor_pago).toFixed(2) }}
        </template>


    </v-data-table-server>
</template>
  
<script lang="ts">

import { IValores, IVenda } from '@/interfaces/Venda';
import { useVendasStore } from '@/store/Vendas';
import { usePessoasStore } from "@/store/Pessoas"
import { defineComponent, onMounted, ref } from 'vue'


export default defineComponent({
    name: 'Vendas',

    data() {
        return {
            expanded: [],
            tableHeaders: [
                { title: '#Nº', align: 'start', sortable: false, key: 'id' },
                { title: 'Pessoa', align: 'start', sortable: false, key: 'PessoaId' },
                { title: 'Tipo', align: 'center', sortable: false, key: 'Tipo' },
                { title: 'Status', align: 'center', sortable: false, key: 'Status' },
                { title: 'Data de Registro', align: 'center', sortable: false, key: 'Registro' },
                { title: 'Valores', align: 'end', sortable: false, key: 'valores' },
                { title: 'Adiantamentos', align: 'end', sortable: false, key: 'adiantamentos' },
                { title: '', key: 'data-table-expand', align: 'end', sortable: false },


            ] as unknown as [],
            menuMaisOpcoesPedido : false as boolean
        }
    },
    methods: {
        idPorNome(id: number) {
            let nome = ""
            nome = this.pessoaStore.getNomePorId(id)
            return nome
        },
        retornaValor(teste: IValores) {
            console.log(teste)
            return teste.valores_produtos
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

