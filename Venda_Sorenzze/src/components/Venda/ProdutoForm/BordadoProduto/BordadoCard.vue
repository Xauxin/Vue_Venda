<template>
    <v-row>
        <v-col cols="4" v-for="(item, index) in locaisEscolhidos" :key="index">
            <v-card density="compact" height="100%" min-height="235" color="primary">
                <v-card-title class="pa-0 text-center text-caption text-capitalize">
                    <p>{{ !item.includes('outro') ? item.replace("_", " ") : contexto }}</p>
                </v-card-title>
                <v-card-subtitle class="text-center text-caption">{{ (bordadosEscolhidos[(item as string)] ?
                    (item.includes('outro')? bordadosEscolhidos[(item as string)].bordado.codigo : bordadosEscolhidos[(item as string)].codigo) : "B1ABC00.ABC") }}</v-card-subtitle>
                <v-divider class="mx-2 my-1"></v-divider>
                <v-card-text class="pa-0">
                    <v-img v-bind:item="item"
                        :src="bordadosEscolhidos[(item as string)] ? (item.includes('outro')? bordadosEscolhidos[(item as string)].bordado.Imagem : bordadosEscolhidos[(item as string)].Imagem) : ''"
                        min-height="100" height="100" aspect-ratio="1/1">
                    </v-img>
                    <v-divider class="mx-2 my-1"></v-divider>
                    <p height="24px" class="mt-1 text-center text-body-1">R${{ (bordadosEscolhidos[(item as string)] ?
                        ((item.includes('outro') ? bordadosEscolhidos[(item as string)].bordado.preco : bordadosEscolhidos[(item as string)].preco )) : "ㅤ") }}</p>
                </v-card-text>
                <v-divider class="mx-2"></v-divider>
                <v-card-actions align-self="bo">
                    <v-row>
                        <v-col cols="4">
                            <v-btn variant="flat" icon="add" :id="item" @click.prevent="$emit('abreDialog', item)" rounded
                                density="compact" color="secondary" bg-color="info"></v-btn>
                        </v-col>
                        <v-col cols="4" offset="4">
                            <v-btn variant="flat" density="compact" rounded icon="delete" @click="console.log(locaisEscolhidos)" color="secondary"
                                bg-color="danger"></v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="4" v-if="locais.length">
            <v-card color="primary" justify="center" density="compact" height="100%" min-height="235" @click="escolhendoCard = !escolhendoCard">
                <v-card-text class="text-center fill-height">
                    <v-row height="100%">
                        <v-col cols="12" justify-self="center">
                            <v-icon v-if='!escolhendoCard' size="x-large">add</v-icon>
                            <v-menu v-else :close-on-content-click="false"  aling="center" location="center" min-width="200px" v-model="menuLocais">
                                <template v-slot:activator="{ props }"> 
                                    <v-btn color="secondary" v-bind="props" justify-self='center'>
                                        Local
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item ref="listaLocais"  v-for="(item, index) in locais" :key="index" :value="index">
                                        <v-list-item-title @click="adicionaBordado(item as string)" v-if="item  != 'outro'" class=" text-capitalize">{{ (item as string).replace("_", " ") }}</v-list-item-title>
                                        <v-text-field v-model="contexto" variant="outlined" label="Outro" v-else density="compact" hide-details>
                                            <template #append>
                                                <v-icon @click="adicionaBordado(item as string)">check</v-icon>
                                            </template>
                                        </v-text-field>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BordadoCards',
    emits:['abreDialog', 'atualizaLocaisEscolhidos'],
    props: {
        locais: {
            type: Array,
            required: true
        },
        bordadosEscolhidos: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            menuLocais: false,
            escolhendoCard: false,
            locaisEscolhidos: [] as String[],
            contexto : "" as string
        }
    },
    methods: {
        abreDialog(item: String) {
            this.$emit('abreDialog', item)
        },
        adicionaBordado(item: String) {
                if(item == 'outro'){
                    this.$emit('atualizaLocaisEscolhidos', ( item as String), this.contexto)
                    this.locaisEscolhidos.push(item)
                    this.menuLocais = false
                }else{
                    this.locaisEscolhidos.push(item)
                    this.$emit('atualizaLocaisEscolhidos', ( item as String))
                    this.escolhendoCard = !this.escolhendoCard
                }
            }
        
    }
})
</script>




