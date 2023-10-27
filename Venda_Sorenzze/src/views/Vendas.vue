<template>
    <v-app-bar>
        <v-row class="ml-3 mr-16" align="center" justify="start">
            <v-col cols="6">
                <VRow no-gutters>
                    <v-col cols="1" class="mr-3">Venda</v-col>
                    <v-divider :thickness="2" class="border-opacity-50 mr-3" vertical></v-divider>
                    <v-col cols="10">Cliente</v-col>
                </VRow>
            </v-col>
            <v-col cols="1"> Emissão </v-col>
            <v-col cols="1" class="text-center"> Fase </v-col>
            <v-col cols="1" class="text-center"> Valor Total </v-col>
            <v-col cols="1" class="ml-6"> Adiantamento</v-col>
            <v-col cols="1" class="">
                <v-row justify="end">
                    <v-col cols="6">
                        <v-tooltip text="Nova Venda" location="top">
                            <template v-slot:activator="{ props }">
                                <v-btn variant="tonal" size="small" v-bind="props" icon="add" to="Venda"></v-btn>
                            </template>
                        </v-tooltip>
                    </v-col>
                    <v-col cols="6">
                        <v-tooltip text="Filtro" location="top">
                            <template v-slot:activator="{ props }">
                                <v-btn variant="tonal" size="small" v-bind="props" icon="filter_alt"></v-btn>
                            </template>
                        </v-tooltip>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-app-bar>
    <v-expansion-panels variant="accordion">
        <v-expansion-panel hide-actions expand-icon="$none">
            <v-expansion-panel-title>
                <v-row no-gutters>
                    <v-col cols="6" align-self="center">
                        <VRow no-gutters>
                            <v-col cols="1" class="mr-3">N.º001</v-col>
                            <v-divider :thickness="2" class="border-opacity-50 mr-3" vertical></v-divider>
                            <v-col cols="10">Dalton Soriani Alves</v-col>
                        </VRow>
                    </v-col>
                    <v-col cols="1" align-self="center"> 25/10/2023 </v-col>
                    <v-col cols="1" align="center"><v-chip size="x-small" class="m-2" color="yellow" variant="elevated">
                            Fila
                        </v-chip></v-col>
                    <v-col cols="1" align-self="center" justify-self="center">
                        <p class="text-center">R$250,00</p>
                    </v-col>
                    <v-col cols="1" class="ml-6" align-self="center">
                        <p class="text-center">R$250,00</p>
                    </v-col>
                </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="px-0">
                <v-row>
                    <v-col cols="10">
                        <v-table class="mr-4">
                            <thead>
                                <tr>
                                    <th class="text-left">Produto</th>
                                    <th class="text-left">Cor</th>
                                    <th class="text-left">Tam</th>
                                    <th class="text-left">Bordados</th>
                                    <th class="text-left">Qnt</th>
                                    <th class="text-left">Valor</th>
                                    <th class="text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Jaleco Masculino</td>
                                    <td>Branco</td>
                                    <td>50</td>
                                    <td>Nome, Manga E</td>
                                    <td>1</td>
                                    <td>R$250</td>
                                    <td class="text-right">R$250,00</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-col>
                    <v-col class="border mt-2">
                        <h3 class="text-center">Pagamentos</h3>
                    </v-col>
                </v-row>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>
  
<script lang="ts">

import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Vendas',
    components: {

    }
})
</script>
  