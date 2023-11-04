<template>
    <v-container class="px-5 py-2" fluid>
        <v-sheet :elevation="3" border rounded class="py-2 px-4" width="100%" min-height="150px">
            <v-row justify="space-evenly" no-gutters>
                <v-col v-for="(item, key) in produtoEscolhido.modelagem" cols=auto v-bind:key=key>
                    <v-container v-if="key == 'Vivo'" class="pa-0 ma-1">
                        <v-switch :label="labelVivo" v-model="vivoOn">
                            <template v-slot:label>
                                <v-btn-toggle  multiple  v-if="vivoOn" density="compact" elevation="2" rounded color="info">
                                    <v-btn class="px-1 py-2" size="x-small" v-for="(iten, key) in item" border :key="key">
                                        {{ key }}
                                    </v-btn>
                                </v-btn-toggle>
                            </template>
                        </v-switch>
                    </v-container>
                    <v-container v-else class="pa-0 ma-1">
                        <p class="text-center">{{ key }}</p>
                        <v-btn-toggle density="compact" elevation="2" rounded color="info">
                            <v-btn class="px-1 py-2" size="x-small" v-for="(iten, key) in item" border :key="key">
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
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos'
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
    name: 'ModelagemProduto',
    components: {

    },
    data() {
        return {
            densidade: "compact" as String,
            vivoOn: false,
            labelVivo: "Vivo"
        }
    },
    watch: {
        vivoOn() {
            if (!this.vivoOn) {
                this.labelVivo = ""
            } else {
                this.labelVivo = "Vivo"
            }
        }
    },
    setup() {
        const store = useEsquemaProdutoStore()
        let produtoEscolhido = ref({} as IEsquemaProduto)
        watch(
            () => store.getEsquema,
            () => {
                produtoEscolhido.value = store.getEsquema
            }
        )
        return {
            store,
            produtoEscolhido
        }
    }
})
</script>
  