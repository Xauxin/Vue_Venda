<template>
    <v-dialog v-model="dialog" attach="body" location="center" no-click-animation close-on-back close-delay="0" open-delay="0" contained>
            <v-row justify="center">
                <v-sheet width="40%" class="pa-2">
                    <v-row>
                        <v-col cols="10">
                            <p class="text-h4">Medidas</p>
                        </v-col>
                        <v-col cols="2">
                            <VRow no-gutters>
                                <v-col cols="6" align="end">
                                    <v-btn size="x-small" icon="delete" @click="apagaMedidas()"></v-btn>
                                </v-col>
                                <v-col cols="6" align="end">
                                    <v-btn size="x-small" icon="close" @click="abreEFechaDialog()"></v-btn>
                                </v-col>
                            </VRow>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row no-gutters>
                        <v-col cols="7" class="px-4 py-4">
                            <v-row>
                                <v-col dense cols="6" v-for="(value, key) in esquemaMedidasEscolhidas" :key="key" class="pa-1">
                                    <v-text-field
                                        v-model="medidas[(key as string)]"
                                        density="compact" 
                                        :label=key.toString()
                                        hide-details
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col class="px-1 py-4" cols="5">
                            <v-row>
                                <v-col cols="12">
                                    <v-autocomplete v-model="possiveisMedidasEscolhidas" :items="MaisMedidasList" chips
                                        closable-chips label="Mais Medidas" multiple>
                                        <template v-slot:chip="{ props }">
                                            <v-chip v-bind="props"></v-chip>
                                        </template>
                                        <template v-slot:item="{ props }">
                                            <v-list-item v-bind="props"></v-list-item>
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                            </v-row>

                        </v-col>
                    </v-row>
                </v-sheet>
            </v-row>
        </v-dialog>
</template>

<script lang="ts">
import { IEsquemaMedidas } from '@/interfaces/EsquemaProdutos'

import { useEsquemaProdutoStore } from '@/store/EsquemaProduto'
import { useProdutoAbertoStore } from '@/store/ProdutoAberto'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'




export default defineComponent({
    name: 'DialogMedidas',
    data() {
        return {
            dialog: false,
            possiveisMedidasEscolhidas: [] as string[],            
        }
    },
    props:{
        esquemaMedidasEscolhidas:{
            type: Object as () => IEsquemaMedidas,
            required: true,

        },
        esquemaMaisMedidasEscolhidas:{
            type: Object as () => IEsquemaMedidas,
            required: true,
            default: {} as IEsquemaMedidas
        }
    },
    computed:{
        MaisMedidasList(){
            return Object.values(this.esquemaMaisMedidasEscolhidas) as unknown as string[]
        }
    },
    watch: {
        possiveisMedidasEscolhidas: function (newArray: string[], oldArray: string[]) {
            console.log(newArray, oldArray)
            if (newArray.length > oldArray.length) {
                this.esquemaStore.alteraEsquemaModelagemEscolhida('add',newArray[newArray.length - 1])
            } else {
                let elementoTirado = oldArray.filter((medida) => !newArray.includes(medida))
                this.esquemaStore.alteraEsquemaModelagemEscolhida('delete', elementoTirado[0])
            }
        }
    },
    methods: {
        // regrasInput(key:string|number, regex:RegExp){
        //     @input="regrasInput(key, new RegExp(/([+])?(\d{1,3})?/))"
        //     console.log(regex.exec(this.MedidasEscolhidas[key]))
        //     const teste = regex.exec(this.MedidasEscolhidas[key])
        //     if (!teste){
        //         this.MedidasEscolhidas[key] = this.MedidasEscolhidas[key].substring(0, this.MedidasEscolhidas[key].length-1)
        //     } else{
        //         this.MedidasEscolhidas[key] = teste[0]
        //     }
        // },
        apagaMedidas() {
            this.medidas =  {}
        },
        abreEFechaDialog(){
            this.dialog = !this.dialog
        }
    },
    setup() {
        const esquemaStore = useEsquemaProdutoStore()
        const produtoAberto = useProdutoAbertoStore()
        const { medidas } = storeToRefs(produtoAberto)
        return {
            medidas,
            produtoAberto,
            esquemaStore
            
        }
    }
    
})
</script>
