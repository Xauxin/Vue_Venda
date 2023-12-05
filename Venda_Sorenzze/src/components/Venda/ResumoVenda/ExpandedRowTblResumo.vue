
<template>
    <tr class="pa-0 ma-0">
                        <td :colspan="columns.length" class="pa-0 ma-0">
                            <v-row no no-gutters class="pa-0">
                                <v-col cols="4">
                                    <v-card class="py-1 ma-1" min-height="140px">
                                        <v-card-title class="pa-0 text-center font-weight-regular"
                                            style=" background-color: #e5e0ff; ">Modelagem</v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text class="pa-1">
                                            <v-container class="pa-0 ma-0" v-for="(value, key, index) in item.modelagem"
                                                :key="key">
                                                <div class="d-flex align-center justify-space-between">
                                                    <p class="text-left mr-2" style="fontWeight: bold">{{ key }}</p>
                                                    <p class="text-right"
                                                        style="textWrap:nowrap; overflow: hidden;">{{ value }}</p>
                                                </div>
                                                <v-divider
                                                    v-if="index < Object.keys(item.modelagem).length - 1"></v-divider>
                                            </v-container>

                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="5">
                                    <v-card class="py-1 ma-1" min-height="140px">
                                        <v-card-title @click="console.log(item.bordados)"
                                            class="pa-0 text-center font-weight-regular"
                                            style='background-color: #e5e0ff'>Bordados</v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text class="pa-1">
                                            <v-container v-if="item.bordados.bordado_do_nome" class="pa-0 ma-0">
                                                <div>
                                                    <p class="text-center pa-0 ma-0"
                                                        :style="fontNomeBordado(item.bordados.bordado_do_nome)">{{
                                                            item.bordados.bordado_do_nome.nome }}</p>
                                                    <p class="text-center pa-0 ma-0"
                                                        :style="fontEmBaixoDoNome(item.bordados.bordado_do_nome.abaixo_do_nome)"
                                                        v-if="!(item.bordados.bordado_do_nome.abaixo_do_nome.text == 'Sem')">
                                                        {{ item.bordados.bordado_do_nome.abaixo_do_nome.text }}</p>
                                                </div>
                                            </v-container>
                                            <v-container v-else class="pa-0 ma-0 d-flex align-center  justify-center">
                                                <p class="font-weight-bold text-center">Sem bordado do nome</p>
                                            </v-container>
                                            <v-divider></v-divider>
                                            <v-container
                                                v-if="item.bordados.manga_direita || item.bordados.manga_esquerda || item.bordados.outro"
                                                class="pa-0 ma-0 d-flex  justify-start">
                                                <v-row>
                                                    <v-col cols="4" class="pa-2 ma-0"
                                                        v-for="(value, key) in bordadosSemONome(item.bordados)" :key="key">
                                                        <v-card variant="flat" class="ma-1">
                                                            <v-card-text class="pa-0 ma-1">
                                                                <v-tooltip location="top">
                                                                    <template v-slot:activator="{ props }">
                                                                        <v-img v-bind="props" :src="((value as IOutroBordado).contexto ? ((value as IOutroBordado).bordado as IBordado).Imagem : value.Imagem as string)"
                                                                            height="60px"></v-img>
                                                                    </template>
                                                                    <template v-slot:default>
                                                                        <p>{{ ((value as IOutroBordado).contexto ? ((value as IOutroBordado).bordado as IBordado).Nome : value.Nome as string) }}</p>
                                                                        <p class="text-center">{{ ((value as IOutroBordado).contexto ? ((value as IOutroBordado).bordado as IBordado).codigo : value.codigo as string) }}</p>
                                                                    </template>

                                                                </v-tooltip>
                                                            </v-card-text>
                                                        </v-card>

                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                            <v-container v-else class="pa-0 ma-0 d-flex  align-center justify-center">
                                                <p class="font-weight-bold text-center ma-4">Sem bordados</p>
                                            </v-container>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="3">
                                    <v-card class="py-1 ma-1" min-height="140px">
                                        <v-card-title 
                                            class="pa-0 text-center font-weight-regular"
                                            style='background-color: #e5e0ff'>Medidas</v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text class="pa-0 text-center center-align">

                                                <v-container  role="img" height="100px" v-if="Object.entries(item.medidas).length > 0">
                                                    <div  v-for="(value, key, index) in item.medidas" :key="key">
                                                        <div class="d-flex align-center justify-space-between">
                                                            <p class="text-left" width="50%" style="text-wrap: nowrap; overflow: hidden;">{{  key }}</p>
                                                            <p class="text-right" width="50%" style="text-wrap: nowrap; overflow: hidden;">{{  value }}</p>
                                                        </div>
                                                        <v-divider 
                                                        v-if="index < Object.keys(item.medidas).length - 1"></v-divider>
                                                    </div>
                                                </v-container>

                                                <p  v-else class="font-weight-bold text-center ma-4">Sem Ajustes ou Medidas</p>

                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </td>
                    </tr>
</template>
  
<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IAbaixoDoNome, IBordado, IBordadoNome, IBordados, IOutroBordado } from "@/interfaces/Bordado";
import { IProduto } from "@/interfaces/Produto";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'ExapandedRowTblResumo',
    props:{
        item:{
            type: Object as () => IProduto,
            required: true
        },
        columns:{
            type: Array,
            required: true
        }
    },
    methods:{
        bordadosSemONome(bordados: IBordados) {
            const bordadosNovo = {} as IBordados
            Object.entries(bordados).forEach(bordado => {
                const [key, value] = bordado
                if (key != "bordado_do_nome") {
                    bordadosNovo[key] = value
                }
            })
            return bordadosNovo
        },
        fontNomeBordado(bordado_do_nome: IBordadoNome) {
            return { fontFamily: bordado_do_nome.fonte }
        },
        fontEmBaixoDoNome(abaixo_do_nome: IAbaixoDoNome) {
            return { fontFamily: abaixo_do_nome.font }
        },
    }});
</script>

<style type="text/css">

</style>
  