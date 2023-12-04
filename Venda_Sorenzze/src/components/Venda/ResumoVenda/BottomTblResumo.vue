<template>
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
                                        <v-switch class="mx-3" density="compact" auto-select-first color="primary"
                                            true-value="Com" false-value="Sem" hide-details :label="`${switchFrete} Frete`"
                                            v-model="switchFrete">
                                        </v-switch>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-select class="mt-2" density="compact" variant="outlined" auto-select-first
                                            v-model="tipoFrete" hide-details label="Tipo" :disabled="!funcaoSwitchFrete"
                                            :items=items>
                                        </v-select>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-text-field
                                            @input="setValorStringEmNumeroNaVariavel($event.target.value, 'frete')"
                                            prefix="R$" density="compact" :disabled="!funcaoSwitchFrete || !tipoFrete"
                                            variant="outlined" hide-details>
                                        </v-text-field>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                            <v-card-actions class="px-3 py-0 ma-0">
                                <v-btn variant="flat" @click.prevent="salvaFrete"
                                    :disabled="!funcaoSwitchFrete || valorFrete == 0" color="success" density="compact"
                                    size="small">Salvar
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
                                        <v-switch class="mx-3" density="compact" auto-select-first color="primary"
                                            true-value="Porcentagem" false-value="Valor" hide-details
                                            :label="`${switchDesconto}`" v-model="switchDesconto">
                                        </v-switch>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-text-field
                                            @input="setValorStringEmNumeroNaVariavel($event.target.value, 'desconto')"
                                            :prefix="switchDesconto == 'Valor' ? 'R$' : '%'" density="compact"
                                            variant="outlined" hide-details>
                                        </v-text-field>

                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                            <v-card-actions class="px-3 py-0 ma-0">
                                <v-btn :disabled="valorDesconto == 0" @click.prevent="salvaDesconto" variant="flat"
                                    color="success" density="compact" size="small">Salvar</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn variant="flat" @click.prevent="cancelaDesconto" color="red" size="small"
                                    density="compact">Cancelar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>
                </td>
                <td>
                    {{ totalVenda.toFixed(2) }}
                </td>
            </tr>
        </tbody>
    </v-table>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'BottomTblResumo',
    props:{
        totalVenda:{
            type: Number,
            required: true
        }
    },
    data(){
        return{
            tipoFrete: "" as string,
            menuFrete: false as boolean,
            switchFrete: "Sem" as string,
            valorFrete: 0 as number,
            menuDesconto: false as boolean,
            switchDesconto: "Valor" as string,
            valorDesconto: 0 as number,
            items: ['Correios', 'Entrega'] as String[],
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
    methods:{
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
    }
});

</script>


	
  