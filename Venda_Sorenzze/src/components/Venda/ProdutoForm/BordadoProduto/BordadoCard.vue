<template>
    <v-row>
        <v-col cols="4" v-for="(value, key) in getBordadosSemONome" :key="key">
            <v-card density="compact" height="100%" min-height="235" color="primary">
                <v-card-title class="pa-0 text-center text-caption text-capitalize">
                    <p>{{ value.local }}</p>
                </v-card-title>
                <v-card-subtitle class="text-center text-caption">{{ (value.bordado as IBordado).codigo ? (value.bordado as
                    IBordado).codigo :
                    "B1ABC00.ABC" }}</v-card-subtitle>
                <v-divider class="mx-2 my-1"></v-divider>
                <v-card-text class="pa-0">
                    <v-img v-bind:item="key" 
                        :src="(value.bordado as IBordado).Imagem ? (value.bordado as IBordado).Imagem : ''" min-height="100"
                        height="100" aspect-ratio="1/1">
                    </v-img>
                    <v-divider class="mx-2 my-1"></v-divider>
                    <p height="24px" class="mt-1 text-center text-body-1">R${{ (value.bordado as
                        IBordado).preco ? (value.bordado as
                            IBordado).preco : "" }}</p>
                </v-card-text>
                <v-divider class="mx-2"></v-divider>
                <v-card-actions align-self="bo">
                    <v-row>
                        <v-col cols="4">    
                            <v-btn variant="flat" icon="add" @click.prevent="abreDialog(key)" rounded density="compact" color="secondary" bg-color="info"></v-btn>

                        </v-col>
                        <v-col cols="4" offset="4">
                            <v-btn variant="flat" density="compact" @click.prevent="excluirBordado(key)" rounded
                                icon="delete" color="secondary" bg-color="danger"></v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="4" v-if="locaisRestantes">
            <v-card color="primary" justify="center" density="compact" height="100%" min-height="235"
                @click="escolhendoCard = !escolhendoCard">
                <v-card-text class="text-center fill-height">
                    <v-row height="100%">
                        <v-col cols="12" justify-self="center">
                            <v-icon v-if='!escolhendoCard' size="x-large">add</v-icon>
                            <v-menu v-else :close-on-content-click="false" aling="center" location="center"
                                min-width="200px" v-model="menuLocais">
                                <template v-slot:activator="{ props }">
                                    <v-btn color="secondary" v-bind="props" justify-self='center'>
                                        Local
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item ref="listaLocais" v-for="(item, key) in locaisRestantes" :key="key"
                                        :value="key">
                                        <v-list-item-title @click="adicionaLocalBordado(item as string)" v-if="item != 'outro'"
                                            class=" text-capitalize">{{ (item as
                                                string).replace("_", " ") }}
                                        </v-list-item-title>
                                        <v-text-field v-model="local" variant="outlined" label="Outro" v-else
                                            density="compact" hide-details>
                                            <template #append>
                                                <v-icon @click="adicionaLocalBordado(local as string)">check</v-icon>
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
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto'
import { useProdutoAbertoStore } from '@/store/ProdutoAberto'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IBordado,  ILocalBordado } from '@/interfaces/Bordado'
import { computed } from 'vue'

export default defineComponent({
    name: 'BordadoCards',
    emits: ['abreDialog', 'atualizaLocaisEscolhidos'],
    data() {
        return {
            menuLocais: false,
            escolhendoCard: false,
            local: "" as string
        }
    },
    methods: {
        abreDialog(key:string|number){
            this.$emit('abreDialog',parseFloat(key as string))
        },
        adicionaLocalBordado(item: string) {
            this.produtoAberto.adicionaLocalBordado(item)
        },
        excluirBordado(key:number) {
            delete this.bordados[key]
        }
    },
    setup() {
        const produtoAberto = useProdutoAbertoStore()
        const esquemaProduto = useEsquemaProdutoStore()
        const { getBordadosSemONome, bordados } = storeToRefs(produtoAberto)
        const { esquema_escolhido } = storeToRefs(esquemaProduto)
        const locaisRestantes = computed(()=> esquemaProduto.locaisDeBordadosRestantes(bordados.value))
        return {
            bordados,
            locaisRestantes,
            getBordadosSemONome,
            esquema_escolhido,
            produtoAberto,
        }
    }
})
</script>




