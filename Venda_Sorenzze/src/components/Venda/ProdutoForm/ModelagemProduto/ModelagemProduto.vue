<template>
    <v-container class="px-3 py-2" fluid>
        <v-sheet :elevation="2" border rounded class="py-2 px-4" width="100%" min-height="150px">
            <v-row justify="space-evenly" no-gutters>
                <v-col v-for="(item, key) in esquemaModelagemEscolhida" cols=auto v-bind:key=key>
                    <v-container v-if="key == 'Vivo'" class="pa-0 ma-1">
                        <p class="text-center">{{ key }}</p>
                        <v-switch v-model="vivoOn" hide-details density="compact" color="primary">
                            <template v-slot:label>
                                <v-btn-toggle color="primary" v-model="modelagem[key]" multiple :disabled="!vivoOn"
                                    density="compact" elevation="2" rounded>
                                    <v-btn prevent :value="iten" class="px-1 py-2" size="x-small"
                                        v-for="(iten, index) in item.opcoes" border :key="index">
                                        {{ iten }}
                                    </v-btn>
                                </v-btn-toggle>
                            </template>
                        </v-switch>
                    </v-container>
                    <v-container v-else class="pa-0 ma-1">
                        <p class="text-center">{{ key }}</p>
                        <v-btn-toggle color="primary" density="compact" elevation="2" rounded mandatory
                            v-model="modelagem[key]">
                            <v-btn prevent :value="key" class="px-1 py-2" size="x-small" v-for="(iten, key) in item.opcoes"
                                border :key="key">
                                {{ key }}
                            </v-btn>
                        </v-btn-toggle>
                    </v-container>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>
  
<script lang="ts">
import { IEsquemaModelagem } from '@/interfaces/EsquemaProdutos'
import { useProdutoAbertoStore } from '@/store/ProdutoAberto'
import { storeToRefs } from 'pinia'
import {  defineComponent,  watch } from 'vue'


export default defineComponent({
    name: 'ModelagemProduto',
    props: {
        esquemaModelagemEscolhida: {
            type: Object as () => IEsquemaModelagem,
            required: true
        },
        modelagemObrigatorias: {
            type: Object as () => { [key: string]: boolean },
            required: true
        }
    },
    data() {
        return {
            densidade: "compact" as String,
            vivoOn: false as boolean,
            labelVivo: "Vivo" as string,
            valid: false,
        }
    },
    watch: {
        vivoOn() {
            if (this.vivoOn == false) {
                delete this.modelagem.Vivo
            }
        }
    },

    setup() {
        const storeProdutoAberto = useProdutoAbertoStore()
        const { modelagem } = storeToRefs(storeProdutoAberto)
        return {
            storeProdutoAberto,
            modelagem,
        }
    }
})
</script>
