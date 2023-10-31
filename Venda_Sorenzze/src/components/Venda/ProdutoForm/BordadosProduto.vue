<template>
    <v-card height="100%" :elevation="3" border rounded class="py-2 px-4">
        <v-row>
            <v-col cols="4" v-for="(item, key) in bordadosEscolhidos"  v-bind:key="key">
                <v-card density="compact" height="100%" color="#BBBBBB">
                    <v-card-title class="text-center text-caption">{{ key.replace("_", " ") }}</v-card-title>
                    <v-card-subtitle class="text-center text-caption">{{ item }}</v-card-subtitle>
                    <v-divider class="mx-2"></v-divider>
                    <v-card-text>
                        <v-img
                            v-bind:key="key"
                            :src= 'bordadoPeloCodigo(item) ? bordadoPeloCodigo(item).Imagem : "-"'
                            aspect-ratio="1/1">
                        </v-img>
                    </v-card-text>
                    <v-divider class="mx-2"></v-divider>
                    <v-card-actions>
                        <v-row>
                            <v-col cols="4">
                                <v-btn variant="flat" icon="add" rounded density="compact" color="success"
                                    bg-color="info"></v-btn>
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
            bordadosEscolhidos:{
                Manga_Esquerda: "B1UNI03_MEDX",
                Manga_Direita: "B1CES01_CARDIO",
                Outro: "B2CLI00_VITALLY"
            },
            bordados: [
                {
                    Nome: "Brasão da Turma XI de Medicina Uningá",
                    Estilo: "Brasão",
                    Núcleo: "Uningá",
                    Particao: "Medicina XI",
                    codigo: "B1UNI03_MEDXI",
                    Imagem: "src/assets/B1UNI02.MEDXI.png",
                    Preço: "25,00",
                },
                {
                    Nome: "Brasão da Liga de Nefrologia Uningá",
                    Estilo: "Brasão",
                    Núcleo: "Uningá",
                    Particao: "Liga de Nefrologia",
                    codigo: "B1UNI01_NEFRO",
                    Imagem: "https://photos.google.com/share/AF1QipMQTb7fk733nSLjX5ZEohlAbBM28MspNo7YOkEE4dVyLfdx_73bem47FJB0Z2r-4g/photo/AF1QipOjvLvbUGZZZPuiBEVdQ7fFQyKLAq30URhLeDy5?key=anJWQ2xxZ0VfTkp0WHVkeDlVY0t1Wl85UkFHUjR3",
                    Preço: "25,00",
                },
                {
                    Nome: "Brasão do Curso de Medicina Uningá",
                    Estilo: "Brasão",
                    Núcleo: "Uningá",
                    Particao: "Curso de Medicina",
                    codigo: "B1UNI02_MED",
                    Imagem: "https://photos.google.com/share/AF1QipMQTb7fk733nSLjX5ZEohlAbBM28MspNo7YOkEE4dVyLfdx_73bem47FJB0Z2r-4g/photo/AF1QipOAC6N0wIv5nD47LWaVpn10BLKpyGepgmNbxrPM?key=anJWQ2xxZ0VfTkp0WHVkeDlVY0t1Wl85UkFHUjR3",
                    Preço: "25,00",
                },
                {
                    Nome: "Brasão da Turma X de Medicina Unicesumar",
                    Estilo: "Brasão",
                    Núcleo: "Unicesumar",
                    Particao: "Medicina X",
                    codigo: "B1CES03_MEDX",
                    Imagem: "https://photos.google.com/share/AF1QipMQTb7fk733nSLjX5ZEohlAbBM28MspNo7YOkEE4dVyLfdx_73bem47FJB0Z2r-4g/photo/AF1QipOfH2ufQbNsF2nZzZptbq-FtCP8gpv-JrTJS6x-?key=anJWQ2xxZ0VfTkp0WHVkeDlVY0t1Wl85UkFHUjR3",
                    Preço: "25,00",
                },
                {
                    Nome: "Brasão da Liga de Cardiologia Unicesumar",
                    Estilo: "Brasão",
                    Núcleo: "Unicesumar",
                    Particao: "Liga de Cardiologia",
                    codigo: "B1CES01_CARDIO",
                    Imagem: "https://photos.google.com/share/AF1QipMQTb7fk733nSLjX5ZEohlAbBM28MspNo7YOkEE4dVyLfdx_73bem47FJB0Z2r-4g/photo/AF1QipMgtBNNef3hKxIy-u-xkciSSOxT3tUvq-yh2dfN?key=anJWQ2xxZ0VfTkp0WHVkeDlVY0t1Wl85UkFHUjR3",
                    Preço: "25,00",
                },
                {
                    Nome: "Brasão do Curso de Medicina Unicesumar",
                    Estilo: "Brasão",
                    Núcleo: "Unicesumar",
                    Particao: "Curso Medicina",
                    codigo: "B1CES02_MED",
                    Imagem: "https://photos.google.com/share/AF1QipMQTb7fk733nSLjX5ZEohlAbBM28MspNo7YOkEE4dVyLfdx_73bem47FJB0Z2r-4g/photo/AF1QipONxSKM6lUBmsu4FQWv9VxFvoE4uGioASgAhiwn?key=anJWQ2xxZ0VfTkp0WHVkeDlVY0t1Wl85UkFHUjR3",
                    Preço: "25,00",
                },
                {
                    Nome: "Logo da Clinica Vitally",
                    Estilo: "Logo",
                    Núcleo: "Clinica",
                    Particao: "Vitally",
                    codigo: "B2CLI00_VITALLY",
                    Imagem: "https://photos.google.com/share/AF1QipMQTb7fk733nSLjX5ZEohlAbBM28MspNo7YOkEE4dVyLfdx_73bem47FJB0Z2r-4g/photo/AF1QipO6GMLBaRuWkHhdxa2oM9O3AkjR4pDlRs4ddNgj?key=anJWQ2xxZ0VfTkp0WHVkeDlVY0t1Wl85UkFHUjR3",
                    Preço: "25,00",

                },
                {
                    Nome: "Logo da Clinica Prevenpet",
                    Estilo: "Logo",
                    Núcleo: "Clinica",
                    Particao: "Prevenpet",
                    codigo: "B2CLI00_PREVENPET",
                    Imagem: "https://photos.google.com/share/AF1QipMQTb7fk733nSLjX5ZEohlAbBM28MspNo7YOkEE4dVyLfdx_73bem47FJB0Z2r-4g/photo/AF1QipPp1Dwy3O0qm1aI7WaEvpdVRZh9QGmy0qJ1lH9-?key=anJWQ2xxZ0VfTkp0WHVkeDlVY0t1Wl85UkFHUjR3",
                    Preço: "25,00",

                },
                {
                    Nome: "Logo da Cirurgia Vascular Hospital Santa Rita",
                    Estilo: "Logo",
                    Núcleo: "Hospital",
                    Particao: "Santa Rita",
                    codigo: "B2HOS00_VASCSR",
                    Imagem: "https://photos.google.com/share/AF1QipMQTb7fk733nSLjX5ZEohlAbBM28MspNo7YOkEE4dVyLfdx_73bem47FJB0Z2r-4g/photo/AF1QipNFqnthh_hv6-fPp7GytsK_wg7XU5sp2X6nt3rb?key=anJWQ2xxZ0VfTkp0WHVkeDlVY0t1Wl85UkFHUjR3",
                    Preço: "25,00",

                } 
            ] as IBordado[],
            Locais_Bordados: ['Manga Esquerda', 'Manga Direita', 'Outros']
        }
    },
    computed:{
        
    },methods:{
        bordadoPeloCodigo(codigoDoBordado: string): IBordado | undefined{
            var bordadoAchado = {} as {}
            this.bordados.forEach((element: IBordado) => {
                if (element.codigo == codigoDoBordado){
                    bordadoAchado = element
                }
            });
            if (bordadoAchado){
                return bordadoAchado as IBordado
            }else{
                return undefined
            }
        }
    }
})
</script>
