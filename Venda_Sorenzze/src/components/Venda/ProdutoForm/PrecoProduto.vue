<template>
    <v-sheet elevation="2" class="px-2 py-4">
                <v-row align="center">
                    <v-col>
                        <v-text-field density="compact" label="Preço" variant="outlined" append-inner-icon="add"
                        auto-select-first menu-icon="" hide-details>
                            
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field density="compact" label="Quantidade" variant="outlined" append-inner-icon="add"
                        auto-select-first menu-icon="" hide-details>

                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field density="compact" label="Valor Total" variant="outlined" append-inner-icon="add"
                        auto-select-first menu-icon="" hide-details>

                        </v-text-field>
                    </v-col>
                    <v-col aling="center">
                        <v-row>
                            <v-col cols="4">
                                <v-btn size="x-small" variant="elevated">
                                    Adicionar
                                </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn size="x-small" variant="elevated">
                                    Guardar
                                </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn size="x-small" variant="elevated">
                                    Excluir
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-sheet>
  </template>
  
  <script lang="ts">
  
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'PrecoProdutos',
    components:{
     
    }
  })
  </script>
  