<template>
    <div>
        <v-card height="100%" :elevation="3" border rounded class="py-2 px-4">
            <v-row>
                <v-col cols="4" v-for="(item, key) in bordadosEscolhidos" :key="key">
                    <v-card density="compact" height="100%" color="#BBBBBB">
                        <v-card-title class="text-center text-caption">{{ key.replace("_", " ") as string }}</v-card-title>
                        <v-card-subtitle class="text-center text-caption">{{ item }}</v-card-subtitle>
                        <v-divider class="mx-2"></v-divider>
                        <v-card-text>
                            <v-img v-bind:key="key" aspect-ratio="1/1">
                            </v-img>
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
                                                        <v-card v-bind="props" height="100%" hover @click.prevent="BordadoPreSelecionado = bordado">
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
                                            <v-img
                                                max-height="200"
                                                :src="BordadoPreSelecionado.Imagem">
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
interface IBordado {
    Nome: string;
    Estilo: string;
    Núcleo: string;
    Particao: string;
    codigo: string;
    Imagem: string;
    Preço: string;
}

import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Home',
    components: {

    },
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
            bordados: [
                {
                    Nome: "Brasão da Turma XI de Medicina Uningá",
                    Estilo: "Brasão",
                    Núcleo: "Uningá",
                    Particao: "Medicina XI",
                    codigo: "B1UNI03_MEDXI",
                    Imagem: "src/assets/B1UNI02_MEDXI.png",
                    Preço: "25,00",
                },
                {
                    Nome: "Brasão da Liga de Nefrologia Uningá",
                    Estilo: "Brasão",
                    Núcleo: "Uningá",
                    Particao: "Liga de Nefrologia",
                    codigo: "B1UNI01_NEFRO",
                    Imagem: "src/assets/B1UNI01_NEFRO.png",
                    Preço: "25,00",
                },
                {
                    Nome: "Brasão do Curso de Medicina Uningá",
                    Estilo: "Brasão",
                    Núcleo: "Uningá",
                    Particao: "Curso de Medicina",
                    codigo: "B1UNI03_MED0",
                    Imagem: "src/assets/B1UNI03_MED0.png",
                    Preço: "25,00",
                },
                {
                    Nome: "Brasão da Turma X de Medicina Unicesumar",
                    Estilo: "Brasão",
                    Núcleo: "Unicesumar",
                    Particao: "Medicina X",
                    codigo: "B1CES02_MEDX",
                    Imagem: "src/assets/B1CES02_MEDX.png",
                    Preço: "25,00",
                },
                {
                    Nome: "Brasão da Liga de Cardiologia Unicesumar",
                    Estilo: "Brasão",
                    Núcleo: "Unicesumar",
                    Particao: "Liga de Cardiologia",
                    codigo: "B1CES01_CARDIO",
                    Imagem: "src/assets/B1CES01_CARDIO.png",
                    Preço: "25,00",
                },
                {
                    Nome: "Brasão do Curso de Medicina Unicesumar",
                    Estilo: "Brasão",
                    Núcleo: "Unicesumar",
                    Particao: "Curso Medicina",
                    codigo: "B1CES03_MED0",
                    Imagem: "src/assets/B1CES03_MED0.png",
                    Preço: "25,00",
                },
                {
                    Nome: "Logo da Clinica Vitally",
                    Estilo: "Logo",
                    Núcleo: "Clinica",
                    Particao: "Vitally",
                    codigo: "B2CLI00_VITALLY",
                    Imagem: "src/assets/B2CLI00_VITAL.png",
                    Preço: "25,00",

                },
                {
                    Nome: "Logo da Clinica Prevenpet",
                    Estilo: "Logo",
                    Núcleo: "Clinica",
                    Particao: "Prevenpet",
                    codigo: "B2CLI00_PREVEN",
                    Imagem: "src/assets/B2CLI00_PREVEN.png",
                    Preço: "25,00",

                },
                {
                    Nome: "Logo da Cirurgia Vascular Hospital Santa Rita",
                    Estilo: "Logo",
                    Núcleo: "Hospital",
                    Particao: "Santa Rita",
                    codigo: "B2HOS00_VASCSR",
                    Imagem: "src/assets/B2HOS00_VASCSR.png",
                    Preço: "25,00",

                }
            ] as IBordado[],
            Locais_Bordados: ['Manga Esquerda', 'Manga Direita', 'Outros']
        }
    },
    computed: {

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
        }
    }
})
</script>
