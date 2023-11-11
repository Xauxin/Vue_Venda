<template>
    <v-container class="px-5 py-2" fluid>
        <v-sheet :elevation="3" border rounded class="py-2 px-4" width="100%" min-height="150px">
            <v-row justify="space-evenly" no-gutters>
                <v-col v-for="(item, key) in esquemaModelagemEscolhida" cols=auto v-bind:key=key>
                    <v-container v-if="key == 'Vivo'" class="pa-0 ma-1">
                        <p class="text-center">{{ key }}</p>
                        <v-switch v-model="vivoOn" hide-details density="compact" color="primary">
                            <template v-slot:label>
                                <v-btn-toggle v-model="modelagemEscolhida[key]" multiple :disabled="!vivoOn"
                                    density="compact" elevation="2" rounded color="info">
                                    <v-btn prevent :value="iten" class="px-1 py-2" size="x-small" v-for="(iten, index) in item.opcoes" border
                                        :key="index">
                                        {{ iten }}
                                    </v-btn>
                                </v-btn-toggle>
                            </template>
                        </v-switch>
                    </v-container>
                    <v-container v-else class="pa-0 ma-1">
                        <p class="text-center">{{ key }}</p>
                        <v-btn-toggle density="compact" elevation="2" rounded mandatory
                            v-model="modelagemEscolhida[key]">
                            <v-btn prevent :value="key" class="px-1 py-2" size="x-small" v-for="(iten, key) in item.opcoes" border
                                :key="key">
                                {{ key }}
                            </v-btn>
                        </v-btn-toggle>
                    </v-container>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>
  
<script lang="ts">
import { IEsquemaModelagem } from '@/interfaces/EsquemaProdutos'
import { IModelagem } from '@/interfaces/Produto'
import { useProdutoAbertoStore } from '@/store/ProdutoAberto'
import { defineComponent, ref } from 'vue'


export default defineComponent({
    name: 'ModelagemProduto',
    props:{
        esquemaModelagemEscolhida:{
            type: Object as () => IEsquemaModelagem,
            required: true
        }
    },
    data() {
        return {
            oldModelagemEscolhido: {} as IModelagem,
            densidade: "compact" as String,
            vivoOn: false as boolean,
            labelVivo: "Vivo" as string,
            valid : false
        }
    },
    watch: {
        vivoOn() {
            if (this.vivoOn == false) {
                this.modelagemEscolhida['Vivo'] = []
            }
        },
        modelagemEscolhida:{
            handler(){
                if(this.modelagemEscolhida != this.oldModelagemEscolhido){
                    this.oldModelagemEscolhido = { ...this.modelagemEscolhida }
                    for(const [key, value] of Object.entries(this.modelagemEscolhida)){
                       if(!value && this.modelagemObrigatórias[key] == true){

                        return false
                       }
                    }
                    this.valid = true
                    this.storeProdutoAberto.setModelagem(this.modelagemEscolhida)
                }
            },
            deep:true
        }
    },
    setup() {
        const storeProdutoAberto = useProdutoAbertoStore()
        const modelagemObrigatórias = ref({} as { [nome: string]: boolean })
        const modelagemEscolhida = ref({} as IModelagem)

       
        return {
            storeProdutoAberto,
            modelagemObrigatórias,
            modelagemEscolhida
        }
    }
})
</script>
