<template>
    <v-form>
        <v-container class="px-5 py-2">
            <v-row>
                <v-col>
                    <v-autocomplete density="compact" label="Produto" :items=produtos variant="outlined" append-inner-icon="add"
                        auto-select-first menu-icon="" hide-details>
                    </v-autocomplete>
                </v-col>
                <v-col>
                    <v-autocomplete density="compact"  hide-details label="Cor" :items=cores variant="outlined" append-inner-icon="add" auto-select-first
                        menu-icon="">
                    </v-autocomplete>
                </v-col>
                <v-col>
                    <v-text-field density="compact"  hide-details variant="outlined" label="Tamanho"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field density="compact"  hide-details variant="outlined" label="Quantidade"></v-text-field>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="px-5 py-2">
            <v-sheet :elevation="3" border rounded class="py-2 px-4" width="auto" >
                <v-row height="auto" width="auto" align="center" justify="space-evenly">
                    <v-col v-for="(item, key) in Modelagem_Jaleco" cols=auto  v-bind:key=key>
                        <p>{{ key }}</p>
                        <v-btn-toggle border group color="info">
                            <v-btn v-for="iten in item" border v-bind:key="iten">
                                {{ iten }}
                            </v-btn>
                        </v-btn-toggle>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-container>
        <v-container class="px-5 py-2">
            <v-row >
                <v-col cols="3">
                    <v-sheet :elevation="3" border rounded class="py-1 px-2">
                        <v-row dense no-gutters>
                            <v-col dense class="pa-1" cols="6" v-for="medida in Medidas" v-bind:key="medida">
                                <v-text-field density="compact" :label=medida hide-details></v-text-field>
                            </v-col>
                        </v-row>
                    </v-sheet>
                </v-col>
                <v-col cols="9" >
                    <v-card height="100%" :elevation="3" border rounded class="py-2 px-4">
                        <v-row>
                            <v-col v-for="local in Locais_Bordados" v-bind:key="local" >
                                <v-card density="compact" height="100%" :title=local subtitle="B1CES03.MEDX" color="#BBBBBB">
                                    <v-divider class="mx-2"></v-divider>
                                    <v-card-text>
                                        <v-img 
                                            src="https://lh3.googleusercontent.com/pw/ADCreHf9fwm_Hd6eHCCHIUAo4UHiwarIov7wennLyCLxn0IxdQtck8c2GPMIu7ivkE2Wc2I-oIrQIx98O5Y-Uco2SNx6qh1VVmIbdxk___049G1dCrv23lCYlSldnmCejXQ5aflUruQ4-nAAbbAvt5S0P0Wr=w320-h300-s-no-gm?authuser=0"
                                            aspect-ratio="1/1"
                                            width="100%"
                                            rounded
                                            hover
                                        >
                                        </v-img>
                                    </v-card-text>
                                    <v-divider class="mx-2"></v-divider>
                                    <v-card-actions>
                                        <v-btn variant="flat" color="info" bg-color="info" >Selecionar</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="mb-0">
            <v-sheet elevation="2" class="px-2 py-4">
                <v-row align="center">
                    <v-col>
                        <v-text-field density="compact" label="Preço" :items=produtos variant="outlined" append-inner-icon="add"
                        auto-select-first menu-icon="" hide-details>
                            
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field density="compact" label="Quantidade" :items=produtos variant="outlined" append-inner-icon="add"
                        auto-select-first menu-icon="" hide-details>

                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field density="compact" label="Valor Total" :items=produtos variant="outlined" append-inner-icon="add"
                        auto-select-first menu-icon="" hide-details>

                        </v-text-field>
                    </v-col>
                    <v-col aling="center">
                        <v-row>
                            <v-col cols="4">
                                <v-btn size="small" variant="elevated">
                                    Adicionar
                                </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn size="small" variant="elevated">
                                    Guardar
                                </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn size="small" variant="elevated">
                                    Excluir
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-container>
    </v-form>
</template>
  
<script lang="ts">

import { defineComponent } from 'vue'
export default defineComponent({
    name: 'ProdutoForm',
    components: {

    },
    data() {
        return {
            produtos: ['Jaleco Masculino', 'Blusa Cirurgica', 'Calça Cirurgica', 'Touca Cirurgica'],
            cores: ['Branco', 'Preto', 'Azul-Noite', 'Verde Militar'],
            Modelagem_Jaleco: {
                Recorte: ['Reto', 'Redondo'],
                Gola: ['Padre', 'Blaser', 'Smoking'],
                Manga: ['Curta', 'Cavada', 'Franzida', 'Longa Basica'],
                Punho: ['Básico', 'Camisa', 'Ribana', 'Elástico'],
                Trava: ['Presa', '3Tiras', '4Tiras', 'Básica', 'Presa com Laço'],
            },
            Medidas: ['Busto', 'Ombro', 'Costa', 'Frente', 'Decote', 'Alt.Seio', 'Comp', 'Cintura', 'Quadril', 'Manga Longa', 'Cava', 'Bordado', 'Trava', 'Botão'],
            Possiveis_Medidas: ['Biceps', 'Subir Curva do Busto', 'No meio das Costas', 'Da cava a Barra'],
            Locais_Bordados : ['Manga Esquerda', 'Manga Direita', 'Outros'] 
        }
    }
})
</script>
  