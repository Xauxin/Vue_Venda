<template>
    <v-container class="px-5 py-2" fluid>
            <v-sheet :elevation="3" border rounded class="py-2 px-4" width="auto" >
                <v-row justify="space-evenly" no-gutters>
                    <v-col v-for="(item, key) in Modelagem_Jaleco" cols=auto  v-bind:key=key>
                        <p class="text-center">{{ key }}</p>
                        <v-btn-toggle density="compact" elevation="2"  rounded color="info">
                            <v-btn  class="px-1 py-2" size="x-small" v-for="iten in item" border v-bind:key="iten">
                                {{ iten }}
                            </v-btn>
                        </v-btn-toggle>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-container>
  </template>
  
  <script lang="ts">
  
  import { defineComponent } from 'vue'
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
    }    
  })
  </script>
  