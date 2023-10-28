<template>
    <v-sheet :elevation="3" border rounded>
        <v-row class="ma-1" no-gutters>
            <v-col cols="6" v-for="medida in Medidas" v-bind:key="medida">
                <v-row >
                    <v-col class="px-0 ma-1" cols="8"><p class="text-caption">Medidas</p></v-col>
                    <v-col class="mx-n1 my-1" cols="4"><p class="text-caption">+21</p></v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-sheet>
    <v-dialog>
        <v-row dense no-gutters>
        <v-col dense class="pa-1" cols="6" v-for="medida in Medidas" v-bind:key="medida">
            <v-text-field density="compact" :label=medida hide-details></v-text-field>
            </v-col>
        </v-row>
    </v-dialog>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MedidasPrduto',
  components:{
   
  },
  data() {
    return{
        Medidas: ['Busto', 'Ombro', 'Costa', 'Frente', 'Decote', 'Alt.Seio', 'Comp', 'Cintura', 'Quadril', 'Manga Longa', 'Cava', 'Bordado', 'Trava', 'Botão'],
        Possiveis_Medidas: ['Biceps', 'Subir Curva do Busto', 'No meio das Costas', 'Da cava a Barra'],
        MedidasEscolhidas :{}
    }
  }
})
</script>
