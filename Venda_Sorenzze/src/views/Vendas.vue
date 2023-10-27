<template>
    <v-app-bar class="px-6">
        <v-row class="ma-0" align="center" justify="start">
            <v-col cols="6" class="pa-0">
                <VRow no-gutters>
                    <v-col cols="1" class="mr-3">Venda</v-col>
                    <v-col cols="10">Cliente</v-col>
                </VRow>
            </v-col>
            <v-col cols="1"  class="pa-0"> Emissão </v-col>
            <v-col cols="1" class="text-center pa-0"> Fase </v-col>
            <v-col cols="1" class="text-center pa-0"> Valor Total </v-col>
            <v-col cols="1" class="text-right pa-0"> Adiantamento</v-col>
            <v-col cols="1" offset="1">
                <v-row>
                    <v-col cols="6" class="pa-0">
                        <v-tooltip text="Nova Venda" location="top">
                            <template v-slot:activator="{ props }">
                                <v-btn variant="tonal" size="small" v-bind="props" icon="add" to="Venda"></v-btn>
                            </template>
                        </v-tooltip>
                    </v-col>
                    <v-col cols="6" class="pa-0">
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
            <v-expansion-panel-title hide-actions>
                <v-row no-gutters justify="start">
                    <v-col cols="6" align-self="center" class="pa-0">
                        <VRow no-gutters>
                            <v-col cols="1" class="mr-3">N.º001</v-col>
                            <v-col cols="10">Dalton Soriani Alves</v-col>
                        </VRow>
                    </v-col>
                    <v-col cols="1" align-self="center" class="pa-0"> 25/10/2023 </v-col>
                    <v-col cols="1" align="center" class="pa-0"><v-chip size="x-small" class="m-2" color="yellow" variant="elevated">
                            Fila
                        </v-chip></v-col>
                    <v-col cols="1" align-self="center" justify-self="center" class="pa-0">
                        <p class="text-center">R$250,00</p>
                    </v-col>
                    <v-col cols="1" align-self="center" class="pa-0">
                        <p class="text-right">R$250,00</p>
                    </v-col>
                    <v-col cols="2" class="pa-0">

                    </v-col>
                </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="px-0">
                <v-row >
                    <v-col cols="10" class="pl-3 pa-0">
                        <v-table class="mr-4">
                            <thead>
                                <tr>
                                    <th class="text-left pa-0">Produto</th>
                                    <th class="text-left pa-0">Cor</th>
                                    <th class="text-left pa-0">Tam</th>
                                    <th class="text-left pa-0">Bordados</th>
                                    <th class="text-left pa-0">Qnt</th>
                                    <th class="text-right pa-0">Valor</th>
                                    <th class="text-right pa-0">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="pa-0">Jaleco Masculino</td>
                                    <td class="pa-0">Branco</td>
                                    <td class="pa-0">50</td>
                                    <td class="pa-0">Nome, Manga E</td>
                                    <td class="pa-0">1</td>
                                    <td class="pa-0 text-right">R$250</td>
                                    <td class="pa-0 text-right">R$250,00</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-col>
                    <v-col class="pa-2">
                        <v-card variant="elevated" height="h-100" class="pa-1">
                            <v-card-title class="pa-1">Pagamentos</v-card-title>
                            <v-card-item class="pa-1">
                                <v-list lines="one" class="pa-1">
                                    <v-list-item variant="tonal" title="R$250,00" prepend-icon="credit_card" subtitle="MC credit x1" class="pa-1" text-aling="center">

                                    </v-list-item>
                                </v-list>
                            </v-card-item>
                        </v-card>
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

<style scoped>

tr{
    padding: 0;
}
.th{
    padding: 0;
}
</style>
  