<!-- eslint-disable vue/no-useless-template-attributes -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-card height="fitContent">
        <v-card-title @click.prevent="console.log(produtos)"
            class="text-center text-body-1 py-0 tituloCard">Produtos</v-card-title>
        <v-card-text class="px-0 py-2 mx-0">
            <v-data-table :items="produtos" fixed-footer v-model:expanded="expanded" item-value="id" :headers="tableHeaders"
                class="mr-4" height="100%">
                <template v-slot:expanded-row="{ item, columns }" height="100%">
                    <tr class="pa-0 ma-0">
                        <td :colspan="columns.length" class="pa-0 ma-0">
                            <v-row no no-gutters class="pa-0">
                                <v-col cols="4">
                                    <v-card class="py-1 ma-1" min-height="140px">
                                        <v-card-title class="pa-0 text-center font-weight-regular"
                                            style=" background-color: #e5e0ff; ">Modelagem</v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text class="pa-1">
                                            <v-container class="pa-0 ma-0" v-for="(value, key, index) in item.modelagem"
                                                :key="key">
                                                <div class="d-flex align-center justify-space-between">
                                                    <p class="text-left mr-2" style="fontWeight: bold">{{ key }}</p>
                                                    <p class="text-right"
                                                        style="textWrap:nowrap; overflow: hidden;">{{ value }}</p>
                                                </div>
                                                <v-divider
                                                    v-if="index < Object.keys(item.modelagem).length - 1"></v-divider>
                                            </v-container>

                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="5">
                                    <v-card class="py-1 ma-1" min-height="140px">
                                        <v-card-title @click="console.log(item.bordados)"
                                            class="pa-0 text-center font-weight-regular"
                                            style='background-color: #e5e0ff'>Bordados</v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text class="pa-1">
                                            <v-container v-if="item.bordados.bordado_do_nome" class="pa-0 ma-0">
                                                <div>
                                                    <p class="text-center pa-0 ma-0"
                                                        :style="fontNomeBordado(item.bordados.bordado_do_nome)">{{
                                                            item.bordados.bordado_do_nome.nome }}</p>
                                                    <p class="text-center pa-0 ma-0"
                                                        :style="fontEmBaixoDoNome(item.bordados.bordado_do_nome.abaixo_do_nome)"
                                                        v-if="!(item.bordados.bordado_do_nome.abaixo_do_nome.text == 'Sem')">
                                                        {{ item.bordados.bordado_do_nome.abaixo_do_nome.text }}</p>
                                                </div>
                                            </v-container>
                                            <v-container v-else class="pa-0 ma-0 d-flex align-center  justify-center">
                                                <p class="font-weight-bold text-center">Sem bordado do nome</p>
                                            </v-container>
                                            <v-divider></v-divider>
                                            <v-container
                                                v-if="item.bordados.manga_direita || item.bordados.manga_esquerda || item.bordados.outro"
                                                class="pa-0 ma-0 d-flex  justify-start">
                                                <v-row>
                                                    <v-col cols="4" class="pa-2 ma-0"
                                                        v-for="(value, key) in bordadosSemONome(item.bordados)" :key="key">
                                                        <v-card variant="flat" class="ma-1">
                                                            <v-card-text class="pa-0 ma-1">
                                                                <v-tooltip :text="(value.codigo as string)" location="top">
                                                                    <template v-slot:activator="{ props }">
                                                                        <v-img v-bind="props" :src="(value.Imagem as string)"
                                                                            height="60px"></v-img>
                                                                    </template>
                                                                    <template v-slot:default>
                                                                        <p>{{ value.Nome as string }}</p>
                                                                        <p class="text-center">{{ value.codigo as string }}</p>
                                                                    </template>

                                                                </v-tooltip>
                                                            </v-card-text>
                                                        </v-card>

                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                            <v-container v-else class="pa-0 ma-0 d-flex  align-center justify-center">
                                                <p class="font-weight-bold text-center ma-4">Sem bordados</p>
                                            </v-container>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="3">
                                    <v-card class="py-1 ma-1" min-height="140px">
                                        <v-card-title 
                                            class="pa-0 text-center font-weight-regular"
                                            style='background-color: #e5e0ff'>Medidas</v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text class="pa-0 text-center center-align">

                                                <v-container  role="img" height="100px" v-if="Object.entries(item.medidas).length > 0">
                                                    <div  v-for="(value, key, index) in item.medidas" :key="key">
                                                        <div class="d-flex align-center justify-space-between">
                                                            <p class="text-left" width="50%" style="text-wrap: nowrap; overflow: hidden;">{{  key }}</p>
                                                            <p class="text-right" width="50%" style="text-wrap: nowrap; overflow: hidden;">{{  value }}</p>
                                                        </div>
                                                        <v-divider 
                                                        v-if="index < Object.keys(item.medidas).length - 1"></v-divider>
                                                    </div>
                                                </v-container>

                                                <p  v-else class="font-weight-bold text-center ma-4">Sem Ajustes ou Medidas</p>

                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </td>
                    </tr>
                </template>
                <template #item="{ item, isExpanded }">
                    <tr @click.prevent="expandRow(item.id)" :ref="JSON.stringify(item.id)">
                        <td>
                            <p class="" style="textWrap: nowrap;">{{ item.nome }}</p>
                        </td>
                        <td>
                            <p class="text-center">{{ item.tamanho }}</p>
                        </td>
                        <td>
                            <p class="text-right">{{ (item.valor).toFixed(2) }}</p>
                        </td>
                        <td>
                            <p class="text-center">{{ item.quantidade }}</p>
                        </td>
                        <td>
                            <p class="">{{ item ? ((item.valor as number) * item.quantidade).toFixed(2) : "" }}</p>
                        </td>
                        <td>
                            <v-row class="text-center" no-gutters align="center">
                                <v-col cols="2" class="mx-1"><v-btn variant="flat" :ripple="false" :hover="false"
                                        @click="console.log(isExpanded)" size="small" icon="content_copy"></v-btn></v-col>
                                <v-col cols="2" class="mx-1"><v-btn variant="flat" :ripple="false" :hover="false"
                                        size="small" icon="edit"></v-btn></v-col>
                                <v-col cols="2" class="mx-1"><v-btn variant="flat" :ripple="false" :hover="false"
                                        size="small" icon="delete"></v-btn></v-col>
                            </v-row>
                        </td>
                    </tr>
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
                                                {{ valorFrete > 0 && switchFrete == 'Com' ?
                                                    `R$${valorFrete.toFixed(2)}` : "Frete" }}
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
                                                        <v-text-field
                                                            @input="setValorStringEmNumeroNaVariavel($event.target.value, 'frete')"
                                                            prefix="R$" density="compact"
                                                            :disabled="!funcaoSwitchFrete || !tipoFrete" variant="outlined"
                                                            hide-details>
                                                        </v-text-field>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card-text>
                                            <v-card-actions class="px-3 py-0 ma-0">
                                                <v-btn variant="flat" @click.prevent="salvaFrete"
                                                    :disabled="!funcaoSwitchFrete || valorFrete == 0" color="success"
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
                                                        <v-text-field
                                                            @input="setValorStringEmNumeroNaVariavel($event.target.value, 'desconto')"
                                                            :prefix="switchDesconto == 'Valor' ? 'R$' : '%'"
                                                            density="compact" variant="outlined" hide-details>
                                                        </v-text-field>

                                                    </v-list-item>
                                                </v-list>
                                            </v-card-text>
                                            <v-card-actions class="px-3 py-0 ma-0">
                                                <v-btn :disabled="valorDesconto == 0" @click.prevent="salvaDesconto"
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
                                    {{ vendaAberta.getTotalVenda.toFixed(2) }}
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

import { IAbaixoDoNome, IBordadoNome, IBordados } from '@/interfaces/Bordado';
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
            valorFrete: 0 as number,
            menuDesconto: false as boolean,
            switchDesconto: "Valor" as string,
            valorDesconto: 0 as number,
            items: ['Correios', 'Entrega'] as String[],
            expanded: [] as any[],
            tableHeaders: [
                { title: 'Produto', align: 'start', sortable: false, key: 'nome' },
                { title: 'Tmn', key: 'tamanho', align: 'center', sortable: false },
                { title: 'R$(UN)', key: 'valor', align: 'end' },
                { title: 'Qtd', key: 'quantidade', sortable: false, align: 'center' },
                { title: 'Total', key: 'total', sortable: false },
                { title: 'Opções', key: 'opcoes', align: 'end', sortable: false },
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
                totalVenda = totalVenda + ((produto.valor as number) * produto.quantidade)
            })
            if (this.switchFrete == 'Com' && this.valorFrete) {
                totalVenda = totalVenda + this.valorFrete
            }
            if (this.switchDesconto == 'Porcentagem' && this.valorDesconto) {
                const porcentagem = parseFloat(JSON.stringify(this.valorDesconto).length == 1 ? `0.0${this.valorDesconto}` : `0.${this.valorDesconto}`)
                console.log(porcentagem)
                if (porcentagem != 100) {
                    totalVenda = totalVenda - (totalVenda * porcentagem)
                }
            } else if (this.switchDesconto == 'Valor' && this.valorDesconto) {
                totalVenda = totalVenda - this.valorDesconto
            }
            return totalVenda
        },
        labelBotaoDesconto() {
            if (this.valorDesconto != 0 && this.switchDesconto == 'Porcentagem') {
                return `Desc. ${this.valorDesconto}%`
            } else if (this.valorDesconto != 0 && this.switchDesconto == 'Valor') {
                return `Desc. R$${this.valorDesconto.toFixed(2)}`
            } else {
                return 'Desconto'
            }
        }

    },
    methods: {
        bordadosSemONome(bordados: IBordados) {
            const bordadosNovo = {} as IBordados
            Object.entries(bordados).forEach(bordado => {
                const [key, value] = bordado
                if (key != "bordado_do_nome") {
                    bordadosNovo[key] = value
                }
            })
            return bordadosNovo
        },
        fontNomeBordado(bordado_do_nome: IBordadoNome) {
            return { fontFamily: bordado_do_nome.fonte }
        },
        fontEmBaixoDoNome(abaixo_do_nome: IAbaixoDoNome) {
            return { fontFamily: abaixo_do_nome.font }
        },
        multiplica(val1: number, val2: number) {
            return val1 * val2 as number
        },
        cancelaFrete() {
            this.tipoFrete = ""
            this.valorFrete = 0
            this.switchFrete = "Sem"
            this.menuFrete = false
            this.$emit('salvaFrete', {
                valor: this.valorFrete,
                tipo: this.switchFrete
            })
        },
        cancelaDesconto() {
            this.valorDesconto = 0
            this.menuDesconto = false
            this.$emit('salvaDesconto', {
                valor: this.valorDesconto,
                tipo: this.switchDesconto
            })
        },
        salvaFrete() {
            this.menuFrete = false
            this.$emit('salvaFrete', {
                valor: this.valorFrete,
                tipo: this.tipoFrete
            })
        },
        salvaDesconto() {
            this.menuDesconto = false
            this.$emit('salvaDesconto', {
                valor: this.valorDesconto,
                tipo: this.switchDesconto
            })
        },
        setValorStringEmNumeroNaVariavel(texto: string, contexto: string) {
            if (contexto == 'frete') {
                this.valorFrete = parseFloat(texto)
            } else if (contexto == 'desconto') {
                console.log(texto)
                this.valorDesconto = parseFloat(texto)
                console.log(this.valorDesconto)
            }
        },
        expandRow(id: number) {
            if (!this.expanded.includes(id)) {
                console.log(this.expanded)
                this.expanded.pop()
                this.expanded.push(id);
                (this.$refs[id.toString()] as HTMLElement).classList.add('selectedRow');
                const colunaDeBotoes = (this.$refs[id.toString()] as HTMLElement).lastElementChild?.lastElementChild?.querySelectorAll('div')
                colunaDeBotoes?.forEach(btn => {
                    btn.lastElementChild?.classList.add('selectedRow')
                })
            } else {
                this.expanded.pop();
                (this.$refs[id.toString()] as HTMLElement).classList.remove('selectedRow')
                const colunaDeBotoes = (this.$refs[id.toString()] as HTMLElement).lastElementChild?.lastElementChild?.querySelectorAll('div')
                colunaDeBotoes?.forEach(btn => {
                    btn.lastElementChild?.classList.remove('selectedRow')
                })
            }
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
            vendaAberta,
            produtos
        }
    }
})
</script>

<style lang="scss">.selectedRow {
    background: rgb(221, 221, 221);
    animation: none
}</style>
