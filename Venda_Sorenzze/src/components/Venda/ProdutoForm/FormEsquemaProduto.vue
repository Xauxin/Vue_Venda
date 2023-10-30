<template>
    <v-container class="px-5 py-2" fluid height="50%">
        <v-row height="50%">
            <v-col >
                <v-autocomplete density="compact" label="Produto" :items=produtos variant="outlined" auto-select-first
                    hide-details>
                </v-autocomplete>
            </v-col>
            <v-col>
                <v-autocomplete density="compact" hide-details label="Cor" :items=cores variant="outlined"
                    auto-select-first>
                </v-autocomplete>
            </v-col>
            <v-col>
                <v-text-field density="compact" hide-details variant="outlined" label="Tamanho"></v-text-field>
            </v-col>
            <v-col>
                <v-autocomplete density="compact" :items=tecidos hide-details variant="outlined"
                    label="Tecido"></v-autocomplete>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script lang="ts">

import { defineComponent } from 'vue'
export default defineComponent({
    name: 'FormEsquemaProduto',
    components: {

    },
    data() {
        return {
            produtos: ['Jaleco Masculino', 'Blusa Cirurgica', 'Calça Cirurgica', 'Touca Cirurgica'],
            cores: ['Branco', 'Preto', 'Azul-Noite', 'Verde Militar'],
            tecidos: ['Gabardine', 'Tricoline'],
        }
    }
})
</script>
  