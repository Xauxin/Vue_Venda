<template>
    <v-sheet :elevation="3" border rounded height="100%" class="px-2 py-2">
        <v-row class="pa-2">
            <v-col cols="6">
                <p class="text-h6">Medidas</p>
            </v-col>
            <v-col cols="6">
                <VRow no-gutters>
                    <v-col cols="6" align="end">
                        <v-btn size="x-small" icon="edit" @click="dialog = !dialog"></v-btn>
                    </v-col>
                    <v-col cols="6" align="end">
                        <v-btn size="x-small" icon="delete" @click="apagaMedidas()"></v-btn>
                    </v-col>
                </VRow>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="pa-3">
            <v-col cols="6" v-for="(key, item) in MedidasEscolhidas" v-bind:key="key">
                <v-row class="pa-0 overflow-hidden">
                    <v-col class="pa-0 pl-1" cols="8"><p class="text-body-2 text-no-wrap">{{ item }}</p></v-col>
                    <v-col class="pa-0" cols="4"><p class="text-body-2 text-right">{{key}}</p></v-col>
                    <v-divider class="border-opacity-100" vertical ></v-divider>
                    <v-divider class="border-opacity-100"></v-divider>
                </v-row>
            </v-col>
        </v-row>
    </v-sheet>
    <v-dialog v-model="dialog" location="center" no-click-animation close-on-back close-delay="0" open-delay="0" contained>
        <v-sheet width="50%" class="pa-2">
            <v-row>
                <v-col cols="10">
                    <p class="text-h4">Medidas</p>
                </v-col>
                <v-col cols="2">
                    <VRow no-gutters >
                        <v-col cols="6" align="end">
                            <v-btn size="x-small" icon="delete" @click="apagaMedidas()"></v-btn>
                        </v-col>
                        <v-col cols="6" align="end">
                            <v-btn size="x-small" icon="close" @click="dialog = !dialog"></v-btn>
                        </v-col>
                    </VRow>
                </v-col>
            </v-row>
            <v-row dense no-gutters>
            <v-col  dense class="pa-1" cols="6" v-for="medida in Medidas" v-bind:key="medida">
                <v-text-field density="compact" :label=medida hide-details></v-text-field>
                </v-col>
            </v-row>
        </v-sheet>
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
        dialog: false,
        Medidas: ['Busto', 'Ombro', 'Costa', 'Frente', 'Decote', 'Alt.Seio', 'Comp', 'Cintura', 'Quadril', 'Manga Longa', 'Cava', 'Bordado', 'Trava', 'Botão'],
        Possiveis_Medidas: ['Biceps', 'Subir Curva do Busto', 'No meio das Costas', 'Da cava a Barra'],
        MedidasEscolhidas :{
        }
    }
  },
  methods:{
    apagaMedidas(){
        this.MedidasEscolhidas = {} 
    }
  }
})
</script>
