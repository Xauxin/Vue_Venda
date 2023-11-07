<template>
    <v-container class="px-5 py-2" fluid>
        <v-sheet :elevation="3" border rounded class="py-2 px-4" width="100%" min-height="150px">
            <v-row justify="space-evenly" no-gutters>
                <v-col v-for="(item, key) in produtoEscolhido.modelagem" cols=auto v-bind:key=key>
                    <v-container v-if="key == 'Vivo'" class="pa-0 ma-1"> 
                        <p class="text-center">{{ key }}</p>   
                        <v-switch v-model="vivoOn" hide-details density="compact" color="primary">
                            <template v-slot:label>
                                <v-btn-toggle v-model="modelagemEscolhida[key]"  multiple :disabled="!vivoOn" density="compact" elevation="2" rounded color="info">
                                    <v-btn :value="iten" class="px-1 py-2" size="x-small" v-for="iten in item" border  :key="iten">
                                        {{ iten }}
                                    </v-btn>
                                </v-btn-toggle>
                            </template>
                        </v-switch>
                    </v-container>
                    <v-container v-else class="pa-0 ma-1">
                        <p class="text-center">{{ key }}</p>
                        <v-btn-toggle density="compact" elevation="2" rounded color="info" mandatory v-model="modelagemEscolhida[key]">
                            <v-btn :value="key"  class="px-1 py-2" size="x-small" v-for="(iten, key) in item" border :key="key">
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

interface modelagemEscolhida{
    [nome:string]: String | String[]
}

export default defineComponent({
    name: 'ModelagemProduto',
    components: {

    },
    data() {
        return {
            modelagemEscolhida: {} as modelagemEscolhida,
            densidade: "compact" as String,
            vivoOn: false as boolean,
            labelVivo: "Vivo" as  string
            
        }
    },
    watch: {
        vivoOn () {
            if (this.vivoOn == false) {
                this.modelagemEscolhida['Vivo'] = []
         }
    }},
    // methods:{
    //     adicionaModelagem(key, iten){
    //         this.modelagemEscolhida[key] = iten
    //     }
    // },
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
  