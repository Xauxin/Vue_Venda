<template>
    <v-row align="center" no-gutters>
        <v-col cols="2">
            <v-switch density="compact" v-model="comNome" hide-details><v-label>Nome</v-label></v-switch>
        </v-col>
        <v-col cols="10">
            <v-row align="center" v-if="comNome">
                <v-col cols="9">
                    <p class="text-body-1 text-center">Nome</p>
                </v-col>
                <v-col cols="2">
                    <div class="text-center">
                    <v-menu v-model="menu" :close-on-content-click="false" location="end">
                        <template v-slot:activator="{ props }">
                            <v-btn color="info" v-bind="props" density="compact">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </template>

                        <v-card min-width="150">

                            <v-list>
                                <v-list-item>
                                    <v-select class="mt-2" label="Fonte" :items="fontes" v-model="fonteNome" hide-details density="compact" variant="outlined"></v-select>
                                </v-list-item>
                                <v-list-item>
                                    <v-select class="mt-2" variant="outlined" :items="cores" label="Cor" v-model="corNome" hide-details density="compact"></v-select>
                                </v-list-item>
                            </v-list>

                            <v-card-actions>
                                <v-btn variant="tonal" @click="menu = false">
                                    Cancelar
                                </v-btn>
                                <v-btn color="primary" variant="tonal" @click="menu = false">
                                    Salvar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>
                </div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BordadoNome',
    props: {
        cores: {
            type: Array,
            required: true
        },
        fontes: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            comNome: false as boolean,
            labelNome: "Nome" as String,
            fonteNome: "" as String,
            corNome: "" as string,
            menu: false
        }
    }
})
</script>




