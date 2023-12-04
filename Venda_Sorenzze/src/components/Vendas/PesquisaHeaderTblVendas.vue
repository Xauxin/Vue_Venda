<template>
    <v-card>
        <v-card-text>
            <v-row no-gutters align="center">
                <v-col cols="1" class="pr-6">
                    <v-text-field hide-details label="#Nº" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field hide-details label="Nome Cliente" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="1" offset="4">
                    <v-text-field hide-details label="Data" density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols='1' offset="3">
                    <v-btn to="/Venda">Nova Venda</v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'PesquisaHeaderTblVendas',
});
</script>

<style type="text/css"></style>
  