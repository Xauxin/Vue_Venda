<template>
    <v-row>
        <v-col cols="4" v-for="(item, index) in locaisEscolhidos" :key="index">
            <v-card density="compact" height="100%" min-height="235" color="primary">
                <v-card-title class="pa-0 text-center text-caption">{{ item }}</v-card-title>
                <v-card-subtitle class="text-center text-caption">{{ (bordadosEscolhidos[(item as string)] ?
                    bordadosEscolhidos[(item as string)].codigo : "B1ABC00.ABC") }}</v-card-subtitle>
                <v-divider class="mx-2 my-1"></v-divider>
                <v-card-text class="pa-0">
                    <v-img v-bind:item="item"
                        :src="bordadosEscolhidos[(item as string)] ? bordadosEscolhidos[(item as string)].Imagem : ''"
                        min-height="100" height="100" aspect-ratio="1/1">
                    </v-img>
                    <v-divider class="mx-2 my-1"></v-divider>
                    <p height="24px" class="mt-1 text-center text-body-1">{{ (bordadosEscolhidos[(item as string)] ?
                        `R$${bordadosEscolhidos[(item as string)].Preço}` : "ㅤ") }}</p>
                </v-card-text>
                <v-divider class="mx-2"></v-divider>
                <v-card-actions align-self="bo">
                    <v-row>
                        <v-col cols="4">
                            <v-btn variant="flat" icon="add" :id="item" @click.prevent="$emit('abreDialog', item)" rounded
                                density="compact" color="secondary" bg-color="info"></v-btn>
                        </v-col>
                        <v-col cols="4" offset="4">
                            <v-btn variant="flat" density="compact" rounded icon="delete" color="secondary"
                                bg-color="danger"></v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="4" v-if="locais.length">
            <v-card color="primary" justify="center" density="compact" height="100%" min-height="235" @click="escolhendoCard = !escolhendoCard">
                <v-card-text>
                    <v-row height="100%">
                        <v-col cols="12" justify-self="center">
                            <v-icon v-if='!escolhendoCard' size="x-large">add</v-icon>
                            <v-menu v-else aling="center" >
                                <template v-slot:activator="{ props }"> 
                                    <v-btn color="secondary" v-bind="props" justify-self='center'>
                                        Local
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item @click="adicionaBordado(item as string)" v-for="(item, index) in locais" :key="index" :value="index">
                                        <v-list-item-title>{{ item }}</v-list-item-title>
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
            escolhendoCard: false,
            locaisEscolhidos: [] as String[]
        }
    },
    methods: {
        abreDialog(item: String) {
            this.$emit('abreDialog', item)
        },
        adicionaBordado(item: String) {
            this.locaisEscolhidos.push(item)
            this.$emit('atualizaLocaisEscolhidos', ( item as String))
            this.escolhendoCard = !this.escolhendoCard
        }
    }
})
</script>




