<template>
    <div>
        <v-card height="100%" :elevation="3" border rounded class="py-2 px-4">
            <v-row>
                <v-col cols="4">
                    <p class="text-h6 text-center">Nome</p>
                </v-col>
                <v-col cols="4">
                    <v-autocomplete density="compact" label="Fonte" variant="outlined"></v-autocomplete>
                </v-col>
                <v-col cols="4">
                    <v-autocomplete density="compact" label="Cor" variant="outlined"></v-autocomplete>
                </v-col>
            </v-row>
            <v-divider class="mb-1 border-opacity-75"></v-divider>
            <v-row>
                <v-col cols="4" v-for="(item, key) in bordadosEscolhidos" :key="key">
                    <v-card density="compact" height="100%" color="#BBBBBB">
                        <v-card-title class="text-center text-caption">{{ key.replace("_", " ") as string }}</v-card-title>
                        <v-card-subtitle class="text-center text-caption">{{ (item ? item.codigo : '') }}</v-card-subtitle>
                        <v-divider class="mx-2"></v-divider>
                        <v-card-text>
                            <v-img v-bind:key="key" :src="item ? item.Imagem : ''" height="100%" aspect-ratio="1/1">
                            </v-img>
                            <v-divider class="mx-2"></v-divider>
                            <p class="text-center text-body-1">R${{ item ? item.Preço : "" }}</p>
                        </v-card-text>
                        <v-divider class="mx-2"></v-divider>
                        <v-card-actions>
                            <v-row>
                                <v-col cols="4">
                                    <v-btn variant="flat" icon="add" :id="key"
                                        @click.prevent="AbreDialogEMudaBordadoAscessado(key)" rounded density="compact"
                                        color="success" bg-color="info"></v-btn>
                                </v-col>
                                <v-col cols="4" offset="4">
                                    <v-btn variant="flat" density="compact" rounded icon="delete" color="danger"
                                        bg-color=""></v-btn>
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
                                                <v-tooltip :text="bordado.Nome" location="top">
                                                    <template v-slot:activator="{ props }">
                                                        <v-card v-bind="props" height="100%" hover
                                                            @click.prevent="BordadoPreSelecionado = bordado">
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
                            <v-divider thickness="2" color="blue" vertical class="border-opacity-50 my-3"></v-divider>
                            <v-col>
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
                                                            <td v-if="key != 'Imagem'">{{ key }}</td>
                                                            <td v-if="!item.includes('src')">{{ item }}</td>
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

import { IBordado } from '@/interfaces/Interfaces'
import { defineComponent, onMounted, ref } from 'vue'
import { useAppStore } from '@/store/app'


export default defineComponent({
    name: 'Home',
    data() {
        return {
            BordadoPreSelecionado: {} as IBordado,
            BordadoAscessado: "" as String,
            dialog: false as boolean,
            bordadosEscolhidos: {
                Manga_Esquerda: {} as IBordado,
                Manga_Direita: {} as IBordado,
                Outro: {} as IBordado
            },
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
        AbreDialogEMudaBordadoAscessado(key: string) {
            this.BordadoAscessado = key
            this.dialog = !this.dialog
        },
        adicionaBordado() {
            this.bordadosEscolhidos[this.BordadoAscessado] = this.BordadoPreSelecionado
            this.dialog = !this.dialog
        }
    },
    setup() {
        const store = useAppStore()
        const bordados = ref([] as IBordado[])

        onMounted(async () => {
                try {
                    await store.obterBordados()
                    bordados.value = store.getBordados as IBordado[]
                } catch (error) {
                    console.log(error)
                }
            })

        return {
            bordados: bordados,
        }
    }
})
</script>




