<template>
<v-card height="100%" :elevation="3" border rounded class="py-2 px-4">
    <v-row>
        <v-col v-for="local in Locais_Bordados" v-bind:key="local" >
            <v-card density="compact" height="100%"  color="#BBBBBB">
                <v-card-title class="text-center text-body-1">{{ local }}</v-card-title>
                <v-card-subtitle>B1CES03.MEDX</v-card-subtitle>
                <v-divider class="mx-2"></v-divider>
                <v-card-text>
                    <v-img 
                        src="https://lh3.googleusercontent.com/pw/ADCreHf9fwm_Hd6eHCCHIUAo4UHiwarIov7wennLyCLxn0IxdQtck8c2GPMIu7ivkE2Wc2I-oIrQIx98O5Y-Uco2SNx6qh1VVmIbdxk___049G1dCrv23lCYlSldnmCejXQ5aflUruQ4-nAAbbAvt5S0P0Wr=w320-h300-s-no-gm?authuser=0"
                        aspect-ratio="1/1"
                    >
                    </v-img>
                </v-card-text>
                <v-divider class="mx-2"></v-divider>
                <v-card-actions>
                    <v-btn variant="flat" density="compact" size="small" color="info" bg-color="info">add</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</v-card>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Home',
  components:{
   
  },
  data() {
        return {
            Locais_Bordados : ['Manga Esquerda', 'Manga Direita', 'Outros'] 
        }
    }
})
</script>
