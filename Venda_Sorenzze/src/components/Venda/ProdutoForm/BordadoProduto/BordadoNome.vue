<template>
    <v-row align="center">
        <v-col cols="4">
            <p class="text-h6 text-center">Nome</p>
        </v-col>
        <v-col cols="4">
            <v-autocomplete hide-details :items="fontes"  class="pa-1" density="compact" label="Fonte" variant="outlined"></v-autocomplete>
        </v-col>
        <v-col cols="4">
            <v-autocomplete hide-details :items="cores" class="pb-1" density="compact" label="Cor" variant="outlined"></v-autocomplete>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
    name: 'BordadoNome',
    props:{
        cores:{
            type: Array,
            required: true
        },
        fontes:{
            type: Array,
            required: true
        }
    },
    data() {
        return {

        }
    }
})
</script>




