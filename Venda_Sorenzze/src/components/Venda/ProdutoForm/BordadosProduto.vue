<template>
    <div>
        <v-card height="100%" min-height="300" :elevation="3" border rounded class="py-2 px-4">
            <v-row align="center" v-if="produtoEscolhido.nome">
                <v-col cols="4">
                    <p class="text-h6 text-center">Nome</p>
                </v-col>
                <v-col cols="4">
                    <v-autocomplete hide-details class="pb-1" density="compact" label="Fonte" variant="outlined" ></v-autocomplete>
                </v-col>
                <v-col cols="4">
                    <v-autocomplete hide-details class="pb-1" density="compact" label="Cor" variant="outlined"></v-autocomplete>
                </v-col>
            </v-row>
            <v-divider  v-if="produtoEscolhido.nome" class="mb-1 border-opacity-75"></v-divider>
            <v-row>
                <v-col cols="4" v-for="(item, index) in produtoEscolhido.locais_de_bordado" :key="index">
                    <v-card density="compact" height="100%" min-height="235" color="#BBBBBB">
                        <v-card-title class="pa-0 text-center text-caption">{{ item }}</v-card-title>
                        <v-card-subtitle class="text-center text-caption">{{ (bordadosEscolhidos[(item as string)] ? bordadosEscolhidos[(item as string)].codigo : "B1ABC00.ABC") }}</v-card-subtitle>
                        <v-divider class="mx-2 my-1"></v-divider>
                        <v-card-text class="pa-0">
                            <v-img v-bind:item="item" :src="bordadosEscolhidos[(item as string)] ? bordadosEscolhidos[(item as string)].Imagem : ''" min-height="100" height="100" aspect-ratio="1/1">
                            </v-img>
                            <v-divider class="mx-2 my-1"></v-divider>
                            <p height="24px"  class="mt-1 text-center text-body-1">{{ (bordadosEscolhidos[(item as string)] ? `R$${bordadosEscolhidos[(item as string)].Preço}` : "ㅤ") }}</p>
                        </v-card-text>
                        <v-divider class="mx-2"></v-divider>
                        <v-card-actions align-self="bo">
                            <v-row>
                                <v-col cols="4">
                                    <v-btn variant="flat" icon="add" :id="item"
                                        @click.prevent="AbreDialogEMudaBordadoAscessado((item as string))" rounded density="compact"
                                        color="success" bg-color="info"></v-btn>
                                </v-col>
                                <v-col cols="4" offset="4">
                                    <v-btn variant="flat" density="compact" rounded icon="delete" color="danger"
                                        bg-color="danger"></v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
        <v-dialog v-model="dialog" no-click-animation close-on-back close-delay="0" open-delay="0" contained>
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-row align="center" class="px-4 py-2">
                            <v-col cols="11">
                                <p class="text-h4">{{ BordadoAscessado.replace("_", " ") }}</p>
                            </v-col>
                            <v-col justify-self="end">
                                <v-btn icon="close" @click.prevent="dialog = !dialog" density="compact" rounded
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
                                            <v-col cols="2" v-for="bordado in bordados" v-bind:key="bordado.codigo">
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
                                            @click.prevent="adicionaBordado()">Adicionar</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>


                    </v-card>
                </v-col>
            </v-row>
        </v-dialog>
    </div>
</template>

<script lang="ts">

import { IBordado } from '@/interfaces/Bordado' 
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useAppStore } from '@/store/app'
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos'
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto'

interface IBordadosEscolhidos {
    [Local: string]: IBordado

}


export default defineComponent({
    name: 'Home',
    data() {
        return {
            BordadoPreSelecionado: {} as IBordado,
            BordadoAscessado: "" as String,
            dialog: false as boolean,
            campos_a_nao_serem_mostrados : ['id', 'Imagem'],
            bordadosEscolhidos: {
                
            } as IBordadosEscolhidos
        }
    },
    methods: {
        bordadoPeloCodigo(codigoDoBordado: string): IBordado | undefined {
            var bordadoAchado = {} as {}
            this.bordados.forEach((element: IBordado) => {
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
        AbreDialogEMudaBordadoAscessado(key: string) {
            this.BordadoAscessado = key
            this.dialog = !this.dialog
        },
        adicionaBordado() {
            this.bordadosEscolhidos[(this.BordadoAscessado as string)] = this.BordadoPreSelecionado
            this.dialog = !this.dialog
        }
    },
    setup() {
        const storeApp = useAppStore()
        const bordados = ref([] as IBordado[])
        const storeEsquema = useEsquemaProdutoStore()
        let produtoEscolhido = ref({} as IEsquemaProduto)
    watch(
        () => storeEsquema.getEsquema,
        () => {
            produtoEscolhido.value = storeEsquema.getEsquema
            console.log(produtoEscolhido)
        }
    )
        onMounted(async () => {
            try {
                await storeApp.listBordados()
                bordados.value = storeApp.getBordados as IBordado[]
            } catch (error) {
                console.log(error)
            }
        })

        return {
            bordados: bordados,
            produtoEscolhido: produtoEscolhido,

        }
    }
})
</script>




