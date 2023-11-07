<template>
    <div>
        <TabelaMedidas
            :medidas-escolhidas="MedidasEscolhidas" 
            @apaga-medidas="apagaMedidas"
            @abreEFechaDialog="abreEFechaDialog">
        </TabelaMedidas>
        <v-dialog v-model="dialog" location="center" no-click-animation close-on-back close-delay="0" open-delay="0" contained>
            <v-row justify="center">
                <v-sheet width="40%" class="pa-2"  @click="console.log(MedidasEscolhidas)">
                    <v-row>
                        <v-col cols="10">
                            <p class="text-h4">Medidas</p>
                        </v-col>
                        <v-col cols="2">
                            <VRow no-gutters>
                                <v-col cols="6" align="end">
                                    <v-btn size="x-small" icon="delete" @click="apagaMedidas()"></v-btn>
                                </v-col>
                                <v-col cols="6" align="end">
                                    <v-btn size="x-small" icon="close" @click="dialog = !dialog"></v-btn>
                                </v-col>
                            </VRow>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row no-gutters>
                        <v-col cols="7" class="px-4 py-4">
                            <v-row>
                                <v-col dense cols="6" v-for="medida in medidas" v-bind:key="medida" class="pa-1">
                                    <v-text-field v-model="MedidasEscolhidas[medida]" density="compact" :label=medida hide-details
                                        variant="outlined"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col class="px-1 py-4" cols="5">
                            <v-row>
                                <v-col cols="12">
                                    <v-autocomplete v-model="possiveisMedidasEscolhidas" :items="Possiveis_Medidas" chips
                                        closable-chips label="Mais Medidas" multiple>
                                        <template v-slot:chip="{ props }">
                                            <v-chip v-bind="props"></v-chip>
                                        </template>
                                        <template v-slot:item="{ props }">
                                            <v-list-item v-bind="props"></v-list-item>
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-row>
        </v-dialog>
    </div>
</template>

<script lang="ts">
interface IMedidasEscolhidas{
    [medida: string]: string
}


import { defineComponent } from 'vue'
import TabelaMedidas from './TabelaMedidas.vue'
export default defineComponent({
    name: 'MedidasPrduto',
    components: {
        TabelaMedidas
    },
    data() {
        return {
            dialog: false,
            medidas: ['Busto', 'Ombro', 'Costa', 'Frente', 'Decote', 'Alt.Seio', 'Comp', 'Cintura', 'Quadril', 'Manga Longa', 'Cava', 'Bordado', 'Trava', 'Botão'],
            Possiveis_Medidas: ['Biceps', 'Subir Curva do Busto', 'No meio das Costas', 'Da cava a Barra'],
            possiveisMedidasEscolhidas: [] as string[],
            MedidasEscolhidas: {} as IMedidasEscolhidas
        }
    },
    methods: {
        apagaMedidas() {
            this.MedidasEscolhidas = {}
        },
        abreEFechaDialog(){
            this.dialog = !this.dialog
        }

    },

})
</script>
