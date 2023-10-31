<template>
    <div>

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
                <v-col cols="6" v-for="(item, key) in MedidasEscolhidas" v-bind:key="key">
                    <v-row class="pa-0 overflow-hidden">
                        <v-col class="pa-0 pl-1" cols="8">
                            <p class="text-body-2 text-no-wrap">{{ key }}</p>
                        </v-col>
                        <v-col class="pa-0 pr-1" cols="4">
                            <p class="text-body-2 text-right">{{ item }}</p>
                        </v-col>
                        <v-divider class="border-opacity-100" vertical></v-divider>
                        <v-divider class="border-opacity-100"></v-divider>
                    </v-row>
                </v-col>
            </v-row>
        </v-sheet>
        <v-dialog v-model="dialog" location="center" no-click-animation close-on-back close-delay="0" open-delay="0" contained>
            <v-row justify="center">
                <v-sheet width="40%" class="pa-2">
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
                                    <v-text-field density="compact" :label=medida hide-details
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
                                <v-col>
                                    <v-btn color="success">
                                        Salvar
                                    </v-btn>
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

import { defineComponent } from 'vue'
export default defineComponent({
    name: 'MedidasPrduto',
    components: {

    },
    data() {
        return {
            dialog: false,
            medidas: ['Busto', 'Ombro', 'Costa', 'Frente', 'Decote', 'Alt.Seio', 'Comp', 'Cintura', 'Quadril', 'Manga Longa', 'Cava', 'Bordado', 'Trava', 'Botão'],
            Possiveis_Medidas: ['Biceps', 'Subir Curva do Busto', 'No meio das Costas', 'Da cava a Barra'],
            possiveisMedidasEscolhidas: [] as string[],
            MedidasEscolhidas: {

            }
        }
    },
    watch: {
        possiveisMedidasEscolhidas: function (newArray: string[], oldArray: string[]) {
            console.log(newArray, oldArray)
            if (newArray.length > oldArray.length) {
                this.medidas.push(newArray[newArray.length - 1] as string)
                console.log(newArray)
            } else {
                let elementoTirado = oldArray.filter((medida) => !newArray.includes(medida))
                let index = this.medidas.indexOf(elementoTirado[0])
                this.medidas.splice(index, 1)
            }
        }
    },
    methods: {
        apagaMedidas() {
            this.MedidasEscolhidas = {}
        },

    }
})
</script>
