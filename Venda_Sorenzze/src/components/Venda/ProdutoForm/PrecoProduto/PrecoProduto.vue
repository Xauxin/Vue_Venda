<template>
    <v-row align="center">
        <v-col cols="3" class="py-0">
            <v-text-field density="compact" class="inputPreco" prefix="R$" @input="strToNum($event.target.value)"
                type="number" label="Preço" variant="outlined" hide-details />
        </v-col>
        <v-col cols="2" class="py-0">
            <v-text-field density="compact" type="number" label="Quantidade" variant="outlined" auto-select-first
                menu-icon="" v-model="quantidadeProduto" hide-details>
            </v-text-field>
        </v-col>
        <v-col cols="3" class="py-0">
            <v-text-field density="compact" type="number" prefix="R$" label="Valor Total" variant="outlined"
                auto-select-first menu-icon="" hide-details readonly :model-value="valorConjuntoProdutos">
            </v-text-field>
        </v-col>
        <v-col aling="center">
            <v-row>
                <v-col cols="4">
                    <v-btn :disabled="!podeSalvar" @click.prevent="salvaProduto" color="success" density="compact"
                        variant="elevated" style="font-size: 10px;">
                        Adicionar
                    </v-btn>
                </v-col>
                <v-col cols="4">
                    <v-btn :disabled="!podeSalvar" color="info" density="compact" variant="elevated"
                        style="font-size: 10px;">
                        Guardar
                    </v-btn>
                </v-col>
                <v-col cols="4">
                    <v-btn :disabled="!podeSalvar" color="red" density="compact" variant="elevated"
                        style="font-size: 10px;">
                        Excluir
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
  
<script lang="ts">


import { IProduto } from '@/interfaces/Produto'
import { useProdutoAbertoStore } from '@/store/ProdutoAberto'
import { useVendaAbertaStore } from '@/store/VendaAberta'
import { stringLiteral } from '@babel/types'
import { storeToRefs } from 'pinia'
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'PrecoProdutos',
    components: {
    },
    data() {
        return {
            produtoValido: false as boolean,
            quantidadeProduto: 1 as number
        }
    },
    props: {
        nomeBaseEModelagemFoiEscolhido: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        valorConjuntoProdutos() {
            return this.valor * this.quantidadeProduto as number
        },
        podeSalvar() {
            if (this.nomeBaseEModelagemFoiEscolhido && this.valor) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        salvaProduto() {
            const produtoParaSalvar = this.produtoAbertoStore.$state
            this.vendaAberta.setProduto(produtoParaSalvar);
        },
        strToNum(str: string) {
            if (str) {
                this.valor = parseFloat(str)
            } else {
                this.valor = 0
            }
        }
    },

    setup() {
        const produtoAbertoStore = useProdutoAbertoStore();
        const vendaAberta = useVendaAbertaStore()
        const { valor } = storeToRefs(produtoAbertoStore)
        return {
            produtoAbertoStore,
            vendaAberta,
            valor
        }
    }
})
</script>
<style scoped>
.inputPreco :deep(.input)[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
}

.inputPreco :deep(.input)::-webkit-outer-spin-button,
.inputPreco :deep(.input)::-webkit-inner-spin-button {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}</style>
