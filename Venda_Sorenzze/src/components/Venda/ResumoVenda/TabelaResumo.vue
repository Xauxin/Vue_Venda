<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-card height="fitContent">
        <v-card-title @click.prevent="console.log(produtos)" class="text-center text-body-1 py-0 tituloCard">Produtos</v-card-title>
        <v-card-text  class="px-0 py-2 mx-0">
            <v-data-table 
                :row-height="50"
                hover 
                :items="produtos" 
                fixed-footer 
                v-model:expanded="expanded"
                show-expand 
                item-value="id" 
                :headers="tableHeaders"
                class="mr-4"
                height="fit-content" 
                >
                <template v-slot:expanded-row="{ columns, item }">
                    <tr>
                        <td :colspan="columns.length">
                            <p v-for="(value , key) in item.modelagem"  :key=key>{{ `${key}: ${value}` }}</p>
                        </td>
                    </tr>
                </template>
                <template v-slot:item.nome="{value}" >
                    <p class="text-center overflow-x-hidden text-no-wrap" style="width: 60px;">{{ value }}</p>
                </template>
                <template v-slot:item.tamanho="{value}" >
                    <p class="text-center">{{ value }}</p>
                </template>
                <template v-slot:item.preco="{value}" >
                    <p class="text-center">{{ parseFloat(value).toFixed(2) }}</p>
                </template>
                <template v-slot:item.quantidade="{value}" >
                    <p class="text-center">{{ value }}</p>
                </template>
                <template v-slot:item.total="{ item }">
                    <p class="text-center">{{ item ? (item.preco as number) * item.quantidade : "" }}</p>
                </template>
                <template v-slot:item.opcoes>
                    <v-row >
                        <v-col cols="1"><v-btn size="xsmall" icon="content_copy"></v-btn></v-col>
                        <v-col cols="1"><v-btn size="xsmall" icon="edit"></v-btn></v-col>
                        <v-col cols="1"><v-btn size="xsmall" icon="delete"></v-btn></v-col>
                    </v-row>
                </template>
                <template v-slot:bottom>
                    <v-table>
                        <tbody>
                            <tr>
                                <td>
                                    <v-menu v-model="menuFrete" :close-on-content-click="false" location="center">
                                        <template v-slot:activator="{ props }">
                                            <v-btn v-bind="props" density="compact"
                                                :color="valorFrete && switchFrete == 'Com' ? 'green' : ''" size="large">
                                                {{ valorFrete && switchFrete == 'Com' ?
                                                    `R$${parseFloat(valorFrete).toFixed(2)}` : "Frete" }}
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-text class="px-1 py-0 ma-0">
                                                <v-list>
                                                    <v-list-item>
                                                        <v-switch class="mx-3" density="compact" auto-select-first
                                                            color="primary" true-value="Com" false-value="Sem" hide-details
                                                            :label="`${switchFrete} Frete`" v-model="switchFrete">
                                                        </v-switch>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-select class="mt-2" density="compact" variant="outlined"
                                                            auto-select-first v-model="tipoFrete" hide-details label="Tipo"
                                                            :disabled="!funcaoSwitchFrete" :items=items>
                                                        </v-select>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-text-field v-model="valorFrete" density="compact"
                                                            :disabled="!funcaoSwitchFrete || !tipoFrete" prefix="R$"
                                                            variant="outlined" auto-select-first hide-details>
                                                        </v-text-field>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card-text>
                                            <v-card-actions class="px-3 py-0 ma-0">
                                                <v-btn variant="flat" @click.prevent="menuFrete = false"
                                                    :disabled="!funcaoSwitchFrete || valorFrete == ''" color="success"
                                                    density="compact" size="small">Salvar
                                                </v-btn>
                                                <v-spacer></v-spacer>
                                                <v-btn variant="flat" color="red" size="small" density="compact"
                                                    @click.prevent="cancelaFrete">Cancelar
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-menu>
                                </td>
                                <td>
                                    <v-menu v-model="menuDesconto" :close-on-content-click="false" location="center">
                                        <template v-slot:activator="{ props }">
                                            <v-btn v-bind="props" density="compact" size="large">
                                                {{ labelBotaoDesconto }}
                                            </v-btn>
                                        </template>
                                        <v-card min-width="200px">
                                            <v-card-text class="px-1 py-0 ma-0">
                                                <v-list>
                                                    <v-list-item>
                                                        <v-switch class="mx-3" density="compact" auto-select-first
                                                            color="primary" true-value="Porcentagem" false-value="Valor"
                                                            hide-details :label="`${switchDesconto}`"
                                                            v-model="switchDesconto">
                                                        </v-switch>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-text-field v-model="valorDesconto" density="compact"
                                                            :prefix="switchDesconto == 'Valor' ? 'R$' : '%'"
                                                            variant="outlined" auto-select-first hide-details>
                                                        </v-text-field>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card-text>
                                            <v-card-actions class="px-3 py-0 ma-0">
                                                <v-btn :disabled="!valorDesconto" @click.prevent="menuDesconto = false"
                                                    variant="flat" color="success" density="compact"
                                                    size="small">Salvar</v-btn>
                                                <v-spacer></v-spacer>
                                                <v-btn variant="flat" @click.prevent="cancelaDesconto" color="red"
                                                    size="small" density="compact">Cancelar</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-menu>
                                </td>
                                <td>
                                    {{ calculaTotal }}
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>
  
<script lang="ts">

import { IProduto } from '@/interfaces/Produto';
import { useVendaAbertaStore } from '@/store/VendaAberta'
import { ref, watch } from 'vue';
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TabelaResumo',
    data() {
        return {
            tipoFrete: "" as string,
            menuFrete: false as boolean,
            switchFrete: "Sem" as string,
            valorFrete: "" as string,
            tipoDesconto: "" as string,
            menuDesconto: false as boolean,
            switchDesconto: "Valor" as string,
            valorDesconto: "" as string,
            items: ['Correios', 'Entrega'] as String[],
            expanded: [],
            tableHeaders: [
                { title: 'Produto', align: 'start', sortable: false, key: 'nome' },
                { title: 'Tmn', key: 'tamanho', sortable: false },
                { title: 'R$(UN)', key: 'preco'},
                { title: 'Qtd', key: 'quantidade', sortable: false },
                { title: 'Total', key: 'total', sortable: false },
                { title: 'Opções', key: 'opcoes', sortable: false },
                { title: '', key: 'data-table-expand', align: 'end', sortable: false },
            ] as unknown as []
        }
    },
    computed: {
        funcaoSwitchFrete() {
            if (this.switchFrete == 'Sem') {
                return false
            } else {
                return true
            }
        },
        calculaTotal() {
            var totalVenda = 0 as number
            this.produtos.forEach((produto: IProduto) => {
                totalVenda = totalVenda + ((produto.preco as number) * produto.quantidade)
            })
            if (this.switchFrete == 'Com' && this.valorFrete) {
                totalVenda = totalVenda + parseInt(this.valorFrete)
            }
            if (this.switchDesconto == 'Porcentagem' && this.valorDesconto){
                const porcentagem = parseFloat(this.valorDesconto.length == 1 ? `0.0${this.valorDesconto}` : `0.${this.valorDesconto}`)
                console.log(porcentagem)
                if (porcentagem != 100){
                    totalVenda = totalVenda - ( totalVenda * porcentagem)          
                }
            } else if (this.switchDesconto == 'Valor' && this.valorDesconto){
                totalVenda = totalVenda - parseInt(this.valorDesconto)
            }
            return totalVenda
        },
        labelBotaoDesconto() {
            if (this.valorDesconto && this.switchDesconto == 'Porcentagem') {
                return `Desc. ${this.valorDesconto}%`
            } else if (this.valorDesconto && this.switchDesconto == 'Valor') {
                return `Desc. R$${parseFloat(this.valorDesconto).toFixed(2)}`
            } else {
                return 'Desconto'
            }
        }

    },
    methods: {
        multiplica(val1: number, val2: number) {
            return val1 * val2 as number
        },
        cancelaFrete() {
            this.tipoFrete = ""
            this.valorFrete = ""
            this.switchFrete = "Sem"
            this.menuFrete = false
        },
        cancelaDesconto() {
            this.valorDesconto = ""
            this.menuDesconto = false
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
  