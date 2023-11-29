<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-data-table-server height="h-100" :row-height="50" :items-length="0" :items="vendas" fixed-footer
        v-model:expanded="expanded" show-expand item-value="id" :headers="tableHeaders" class="mr-4">
        <template v-slot:top>
            <v-card>
                <v-card-text>
                    <v-row no-gutters align="center">
                        <v-col cols="1" class="pr-6">
                            <v-text-field hide-details label="#Nº" density="compact" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field hide-details label="Nome Cliente" density="compact"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="1" offset="4">
                            <v-text-field hide-details label="Data" density="compact" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols='1' offset="3">
                            <v-btn to="/Venda">Nova Venda</v-btn>
                        </v-col>
                    </v-row>

                </v-card-text>
            </v-card>
        </template>
        <template v-slot:expanded-row="{ item, columns }">
            <td class="pa-1" :colspan="columns.length">
                <v-row no-gutters aling="top">
                    <v-col cols="6">
                        <v-card class="ma-1 pa-1" height="99%">
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
                        <v-card class="ma-1 pa-1" height="99%">
                            <v-card-title class="text-center text-caption pa-0">
                                Valores
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text class="pa-0 ma-0">
                                <v-list density="compact" :items="item.Produtos">
                                    <template v-slot:append="{ item }">
                                        <div>R${{ item.valor.toFixed(2) }}</div>
                                    </template>
                                </v-list>
                                <v-divider></v-divider>
                                <v-list density="compact">
                                    <v-list-item v-if="!maisInfoValores">
                                        <template #title>
                                            <p class='text-center'><v-btn variant="plain" :ripple="false"
                                                    @click.prevent="maisInfoValores = !maisInfoValores">
                                                    <v-icon v-if="!maisInfoValores">expand_more</v-icon>
                                                </v-btn></p>
                                        </template>
                                        <template #append v-if="!maisInfoValores">
                                            <div>R${{ item.valores.valor_total.toFixed(2) }}</div>
                                        </template>
                                        <template #prepend v-if="item.valores.frete.valor | item.valores.desconto.valor">
                                            <v-icon>Error</v-icon>
                                        </template>
                                    </v-list-item>
                                    <v-list-item v-else>
                                        <v-list density="compact" class="pa-0 ma-0">
                                            <v-list-item class="pa-0 ma-0">
                                                <template #title>
                                                    Total Dos Produtos
                                                </template>
                                                <template #append>
                                                    R${{ item.valores.valores_produtos.toFixed(2) }}
                                                </template>
                                            </v-list-item>
                                            <v-list-item class="pa-0 ma-0">
                                                <template #title>
                                                    Frete
                                                </template>
                                                <template #append>
                                                    R${{ item.valores.frete.valor.toFixed(2) }}
                                                </template>
                                            </v-list-item>
                                            <v-list-item class="pa-0 ma-0">
                                                <template #title>
                                                    Desconto
                                                </template>
                                                <template #append>
                                                    <p>
                                                        {{ item.valores.desconto.tipo == 'Porcentagem' ?  `${item.valores.desconto.valor}%` : `R$${item.valores.desconto.valor.toFixed(2)}` }}
                                                    </p>
                                                </template>
                                            </v-list-item>
                                            <v-divider></v-divider>
                                            <v-list-item class="pa-0 ma-0">
                                                <template #title>
                                                    Total
                                                </template>
                                                <template #append>
                                                    R${{ item.valores.valor_total.toFixed(2) }}
                                                </template>
                                            </v-list-item>
                                            <v-list-item class="pa-0 ma-0">
                                                <template #title>
                                                    <p class='text-center'><v-btn variant="plain" :ripple="false"
                                                    @click.prevent="maisInfoValores = !maisInfoValores">
                                                    <v-icon>expand_less</v-icon>
                                                </v-btn></p>
                                                </template> 
                                            </v-list-item>
                                        </v-list>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="2">
                        <v-card class="ma-1 pa-1" height="99%">
                            <v-card-title class="text-center text-caption pa-0">
                                Pagamentos
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text class="pa-0 ma-0">
                                <v-list density="compact" :items="item.adiantamentos">
                                    <template v-slot:prepend="{ item }">
                                        <v-icon v-if="item.tipo == 'cartao'" icon="credit_card"></v-icon>
                                        <v-icon v-else-if="item.tipo == 'pix'">
                                            <PixIcon></PixIcon>
                                        </v-icon>
                                        <v-icon v-else-if="item.tipo == 'dinheiro'" icon="payments"></v-icon>
                                    </template>
                                    <template v-slot:title="{ item }">
                                        <p>{{ item.valor_pago.toFixed(2) }}</p>
                                    </template>
                                    <template v-slot:append="{ item }">
                                        <p>{{ diaEMesdeData(item.data.toString()) }}</p>
                                    </template>
                                </v-list>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn size="small" density='comfortable' color="primary" variant="flat">Faturar</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn size="small" density='comfortable' color="yellow" variant="flat">Adiant...</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="1">
                        <v-card :class="'ma-1 pa-1'" height="99%">
                            <v-card-title class="text-center text-caption pa-0">
                                Açoes
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text class="ma-0 pa-0">
                                <v-list density="compact">
                                    <v-list-item class="text-center">
                                        <v-tooltip text="Editar Venda">
                                            <template v-slot:activator="{ props }">
                                                <v-btn icon="edit" v-bind="props" density="comfortable" rounded class="px-6"
                                                    variant="tonal"></v-btn>
                                            </template>
                                        </v-tooltip>
                                    </v-list-item>
                                    <v-list-item class="text-center"><v-btn icon="receipt_long" rounded class="px-6"
                                            density="comfortable" variant="tonal"></v-btn></v-list-item>
                                    <v-list-item class="text-center"><v-btn icon="print" rounded class="px-6"
                                            density="comfortable" variant="tonal"></v-btn></v-list-item>
                                    <v-list-item class="text-center">
                                        <v-menu v-model="menuMaisOpcoesPedido" :close-on-content-click="false"
                                            location="center">
                                            <template v-slot:activator="{ props }">
                                                <v-btn class="px-6" v-bind="props" variant="tonal" rounded
                                                    density="comfortable" icon="more_horiz">
                                                </v-btn>
                                            </template>
                                            <v-card style="overflow-y: hidden;" class="cardBotoes">
                                                <v-card-text class="ma-0 pa-1">
                                                    <v-row no-gutters>
                                                        <v-col class="ma-0 pa-1" cols="4"><v-btn icon="delete"
                                                                variant="tonal" size="small" rounded></v-btn></v-col>
                                                        <v-col class="ma-0 pa-1" cols="4"><v-btn icon="shopping_bag"
                                                                variant="tonal" size="small" rounded></v-btn></v-col>
                                                        <v-col class="ma-0 pa-1" cols="4"><v-btn icon="person"
                                                                variant="tonal" size="small" rounded></v-btn></v-col>
                                                    </v-row>
                                                    <v-row no-gutters>
                                                        <v-col class="ma-0 pa-1" cols="4"><v-btn icon="content_copy"
                                                                variant="tonal" size="small" rounded></v-btn></v-col>
                                                        <v-col class="ma-0 pa-1" cols="4"><v-btn icon="picture_as_pdf"
                                                                variant="tonal" size="small" rounded></v-btn></v-col>
                                                        <v-col class="ma-0 pa-1" cols="4"><v-btn icon="" variant="tonal"
                                                                rounded size="small"><v-icon>
                                                                    <WhatsIcon></WhatsIcon>
                                                                </v-icon></v-btn></v-col>
                                                    </v-row>
                                                    <v-row no-gutters>
                                                        <v-col class="ma-0 pa-1" cols="4"><v-btn icon="" variant="tonal"
                                                                size="small" rounded></v-btn></v-col>
                                                        <v-col class="ma-0 pa-1" cols="4"><v-btn icon="description"
                                                                variant="tonal" size="small" rounded></v-btn></v-col>
                                                        <v-col class="ma-0 pa-1" cols="4"><v-btn icon="call" variant="tonal"
                                                                size="small" rounded></v-btn></v-col>
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
        <template v-slot:header.id="{ }">
            <p class="text-center">#Nº</p>
        </template>
        <template v-slot:item.id="{ value }">
            <p class="text-center">{{ value }}</p>
        </template>
        <template v-slot:header.PessoaId="{ }">
            <p class="text-center">Pessoa</p>
        </template>
        <template v-slot:item.PessoaId="{ value }">
            <p class="text-center">{{ idPorNome(value) }}</p>
        </template>
        <template v-slot:item.Status="{ }">
            Entregue
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

import { IAdiantamento, IValores, IVenda } from '@/interfaces/Venda';
import { useVendasStore } from '@/store/Vendas';
import { usePessoasStore } from "@/store/Pessoas"
import { defineComponent, onMounted, ref } from 'vue'
// import { useDate } from 'vuetify/lib/framework.mjs';
import PixIcon from "@/assets/CustomIcons/PixIcon.vue"



export default defineComponent({
    name: 'Vendas',
    components: {
        PixIcon
    },
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
            menuMaisOpcoesPedido: false as boolean,
            maisInfoValores: false as boolean
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
        diaEMesdeData(dataEmString: string) {
            const listDiaMesAno = dataEmString.split('/')
            const diaEMesdeData = `${listDiaMesAno[0]}/${listDiaMesAno[1]}`
            return diaEMesdeData
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


<style lang="scss">.cardBotoes {
    overflow: hidden
}</style>
