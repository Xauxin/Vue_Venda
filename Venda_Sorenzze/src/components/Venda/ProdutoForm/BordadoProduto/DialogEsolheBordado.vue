<template>
    <v-dialog attach="body" v-model="dialog" no-click-animation close-on-back close-delay="0" open-delay="0" contained>
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-row align="center" class="px-4 py-2">
                            <v-col cols="11">
                                <p class="text-h4">{{ BordadoAscessado.replace("_", "") }}</p>
                            </v-col>
                            <v-col justify-self="end">
                                <v-btn icon="close" @click.prevent="dialog = false" density="compact" rounded
                                    variant="tonal"></v-btn>
                            </v-col>
                        </v-row>
                        <v-divider thickness="2" color="blue" class="border-opacity-50 ml-1"></v-divider>
                        <v-row>
                            <v-col cols="9">
                                <v-row no-gutters>
                                    <v-col>
                                        <v-breadcrumbs :items="['Home']">
                                            <template v-slot:prepend>
                                                <v-icon size="small" icon="home"></v-icon>
                                            </template>
                                        </v-breadcrumbs>
                                    </v-col>
                                </v-row>
                                <v-divider thickness="2" color="blue" class="border-opacity-50 ml-1"></v-divider>
                                <v-row class="pa-2">
                                    <v-col>
                                        <v-row>
                                            <v-col cols="2" v-for="bordado in bordadosList" v-bind:key="bordado.codigo">
                                                <v-tooltip  :text="bordado.Nome" location="top">
                                                    <template  v-slot:activator="{ props }">
                                                        <v-card @click.prevent="selcionaBordado(bordado)" v-bind="props" height="100%" hover
                                                            >
                                                            <v-card-title class="text-center text-body-1">{{ bordado.codigo
                                                            }}</v-card-title>
                                                            <v-card-text>
                                                                <v-img v-bind:key="bordado.codigo" :src="bordado.Imagem"
                                                                    aspect-ratio="1/1">
                                                                </v-img>
                                                            </v-card-text>
                                                        </v-card>
                                                    </template>
                                                </v-tooltip>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-divider thickness="1" color="blue" vertical class="border-opacity-50 my-3"></v-divider>
                            <v-col cols="3">
                                <v-card variant="flat">
                                    <v-card-title class="text-center">Selecionado</v-card-title>
                                    <v-card-text>
                                        <v-row>
                                            <v-img max-height="200" :src="BordadoPreSelecionado.Imagem">
                                            </v-img>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-table density="compact">
                                                    <tbody>
                                                        <tr v-for="(item, key) in BordadoPreSelecionado" :key="key">
                                                            <td v-if="!campos_a_nao_serem_mostrados.includes(key)">{{ key }}</td>
                                                            <td v-if="!campos_a_nao_serem_mostrados.includes(key)">{{ item }}</td>
                                                        </tr>
                                                    </tbody>
                                                </v-table>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="green" variant="flat"
                                            @click.prevent="adicionaBordado(BordadoPreSelecionado)">Adicionar</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-dialog>
</template>

<script lang="ts">

import { IBordado, ILocalBordado } from '@/interfaces/Bordado' 
import { defineComponent, onMounted } from 'vue'
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto'
import { storeToRefs } from 'pinia'
import { useProdutoAbertoStore } from '@/store/ProdutoAberto'


export default defineComponent({
    name: 'DialogEsolheBordado',
    props:{
        BordadoAscessado: {
            type: String,
            required: true,
            default: "" as string
        }
    },
    data() {
        return {
            dialog: false,
            BordadoPreSelecionado: {} as IBordado,
            campos_a_nao_serem_mostrados : ['id', 'Imagem']
        }
    },
    methods: {       
        abrirDialog(){
            this.dialog = true
        },
        fechaDialog(){
            this.dialog = false
        },
        bordadoPeloCodigo(codigoDoBordado: string): IBordado | undefined {
            var bordadoAchado = {} as {}
            this.bordadosList.forEach((element: IBordado) => {
                if (element.codigo == codigoDoBordado) {
                    bordadoAchado = element
                }
            });
            if (bordadoAchado) {
                return bordadoAchado as IBordado
            } else {
                return undefined
            }
        },
        selcionaBordado(bordado: IBordado){
            this.BordadoPreSelecionado =  bordado
        },
        adicionaBordado(bordadoASerAdicionado: IBordado){
            this.bordados.map(bordado => {
                if(bordado.local == this.BordadoAscessado){
                    bordado.bordado = bordadoASerAdicionado
                }
                return bordado
            })
            this.dialog = false
        }
    },
    setup() {
        const EsquemaStore = useEsquemaProdutoStore()
        const produtoAberto = useProdutoAbertoStore()
        const { bordados } = storeToRefs(produtoAberto)
        const { bordadosList } = storeToRefs(EsquemaStore)
        onMounted(async () => {
            try {
                if (bordadosList.value.length === 0){
                    await EsquemaStore.listBordados()
                }
            } catch (error) {
                console.log(error)
            }
        })
        return {
            bordadosList,
            bordados
        }
    }
})
</script>




