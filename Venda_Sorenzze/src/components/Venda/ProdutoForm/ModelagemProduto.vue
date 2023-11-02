<template>
    <v-container class="px-5 py-2" fluid>
            <v-sheet :elevation="3" border rounded class="py-2 px-4" width="100%">
                <v-row justify="space-evenly" no-gutters>
                    <v-col v-for="(item, key) in opcaoEscolhida.modelagem" cols=auto  v-bind:key=key>
                        <p class="text-center">{{ key }}</p>
                        <v-btn-toggle density="compact" elevation="2"  rounded color="info">
                            <v-btn  class="px-1 py-2" size="x-small" v-for="(iten, key) in item" border :key="key">
                                {{ key }} 
                            </v-btn>
                        </v-btn-toggle>
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
    components:{
     
    },
    data() {
        return{
            densidade : "compact" as String,
            Modelagem_Jaleco: {
                Recorte: ['Reto', 'Redondo'],
                Gola: ['Padre', 'Blaser', 'Smoking'],
                Manga: ['Curta', 'Cavada', 'Franzida', 'Longa Basica'],
                Punho: ['Básico', 'Camisa', 'Ribana', 'Elástico'],
                Trava: ['Presa', '3Tiras', '4Tiras', 'Básica', 'Presa com Laço'],
            },
        }
    },
    watch:{
        
    },
    setup() {
        const store = useEsquemaProdutoStore()
        let opcaoEscolhida = ref({} as IEsquemaProduto)
    watch(
        () => store.getEsquema,
        () => {
            opcaoEscolhida.value = store.getEsquema
        }
    )
    return {
        store,
        opcaoEscolhida
    }
}    
  })
  </script>
  