
<template>
    <tr class="pa-0 ma-0">
        <td :colspan="columns.length" class="pa-0 ma-0">
            <v-row no no-gutters class="pa-0">
                <!-- Modelagem -->
                <v-col cols="4">
                    <v-card class="py-1 ma-1" min-height="140px">
                        <v-card-title class="pa-0 text-center font-weight-regular"
                            style=" background-color: #e5e0ff; ">Modelagem</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="pa-1">
                            <v-container class="pa-0 ma-0" v-for="(value, key, index) in item.modelagem" :key="key">
                                <div class="d-flex align-center justify-space-between">
                                    <p class="text-left mr-2" style="fontWeight: bold">{{ key }}</p>
                                    <p class="text-right" style="textWrap:nowrap; overflow: hidden;">{{ value }}</p>
                                </div>
                                <v-divider v-if="index < Object.keys(item.modelagem).length - 1"></v-divider>
                            </v-container>

                        </v-card-text>
                    </v-card>
                </v-col>
                <!-- Modelagem -->
                <!-- Bordados -->
                <v-col cols="5">
                    <v-card class="py-1 ma-1" min-height="140px">
                        <v-card-title @click="console.log(item.bordados)" class="pa-0 text-center font-weight-regular"
                            style='background-color: #e5e0ff'>Bordados</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="pa-1">
                            <!-- Bordado Nome -->
                            <v-container v-if="comNome" class="pa-0 ma-0">
                                <div>
                                    <p class="text-center pa-0 ma-0"
                                        :style="fontNomeBordado((bordadoDoNome as IBordadoNome))">
                                        {{ (bordadoDoNome as IBordadoNome).nome }}
                                    </p>
                                    <p class="text-center pa-0 ma-0"
                                        :style="fontEmBaixoDoNome((bordadoDoNome as IBordadoNome).abaixo_do_nome as IAbaixoDoNome)"
                                        v-if="ComBordadoEmbaixoDoNome">
                                        {{ ((bordadoDoNome as IBordadoNome).abaixo_do_nome as IAbaixoDoNome).text }}
                                    </p>
                                </div>
                            </v-container>
                            <v-container v-else class="pa-0 ma-0 d-flex align-center  justify-center">
                                <p class="font-weight-bold text-center">Sem bordado do nome</p>
                            </v-container>
                            <v-divider></v-divider>
                            <!-- Bordado Nome -->
                            <!-- Bordado Brasões/Logos -->
                            <v-container v-if="comBordados" class="pa-0 ma-0 d-flex  justify-start">
                                <v-row>
                                    <v-col cols="4" class="pa-2 ma-0"
                                        v-for="(value, key) in produtoAberto.bordadosSemONome(item.bordados)" :key="key">
                                        <v-card variant="flat" class="ma-1">
                                            <v-card-text class="pa-0 ma-1">
                                                <v-tooltip location="top">
                                                    <template v-slot:activator="{ props }">
                                                        <v-img v-bind="props"
                                                            :src="(value.bordado as IBordado).Imagem ? (value.bordado as IBordado).Imagem : ''"
                                                            height="60px"></v-img>
                                                    </template>
                                                    <template v-slot:default>
                                                        <p>{{ (value.bordado as IBordado).Nome }}</p>
                                                        <p class="text-center">{{ (value.bordado as IBordado).codigo }}</p>
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
                            <!-- Bordado Brasões/Logos -->
                        </v-card-text>
                    </v-card>
                </v-col>
                <!-- Bordados -->
                <!-- Medidas -->
                <v-col cols="3">
                    <v-card class="py-1 ma-1" min-height="140px">
                        <v-card-title class="pa-0 text-center font-weight-regular"
                            style='background-color: #e5e0ff'>Medidas</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="pa-0 text-center center-align">

                            <v-container role="img" height="100px" v-if="Object.entries(item.medidas).length > 0">
                                <div v-for="(value, key, index) in item.medidas" :key="key">
                                    <div class="d-flex align-center justify-space-between">
                                        <p class="text-left" width="50%" style="text-wrap: nowrap; overflow: hidden;">{{ key
                                        }}</p>
                                        <p class="text-right" width="50%" style="text-wrap: nowrap; overflow: hidden;">{{
                                            value }}</p>
                                    </div>
                                    <v-divider v-if="index < Object.keys(item.medidas).length - 1"></v-divider>
                                </div>
                            </v-container>

                            <p v-else class="font-weight-bold text-center ma-4">Sem Ajustes ou Medidas</p>

                        </v-card-text>
                    </v-card>
                </v-col>
                <!-- Medidas -->
            </v-row>
        </td>
    </tr>
</template>
  
<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IAbaixoDoNome, IBordado, IBordadoNome, ILocalBordado } from "@/interfaces/Bordado";
import { IProduto } from "@/interfaces/Produto";
import { useProdutoAbertoStore } from "@/store/ProdutoAberto";
import { computed, defineComponent } from "vue";

export default defineComponent({
    name: 'ExapandedRowTblResumo',
    props: {
        item: {
            type: Object as () => IProduto,
            required: true
        },
        columns: {
            type: Array,
            required: true
        }
    },
    methods: {
        fontNomeBordado(bordado_do_nome: IBordadoNome) {
            return { fontFamily: bordado_do_nome.fonte }
        },
        fontEmBaixoDoNome(abaixo_do_nome: IAbaixoDoNome) {
            return { fontFamily: abaixo_do_nome.font }
        },
    },
    setup(props) {
        const produtoAberto = useProdutoAbertoStore()
        const bordados = props.item.bordados
        const bordadoDoNome = computed(() => {
            return produtoAberto.bordadoDoNome(bordados) as IBordadoNome | void;
        });
        const bordadosSemONome = computed(() => {
            return produtoAberto.bordadosSemONome(bordados);
        });
        const comNome = computed(() => {
            if (bordadoDoNome.value) {
                return true as boolean
            } else {
                return false as boolean
            }
        })
        const ComBordadoEmbaixoDoNome = computed(() => {
            if ((bordadoDoNome.value as IBordadoNome).abaixo_do_nome .text == 'Sem' ) {
                return false as boolean
            } else {
                return true as boolean
            }
        })
        const comBordados = computed(() => {
            if (bordadosSemONome.value) {
                return true as boolean
            } else {
                return false as boolean
            }
        })
        return {
            comNome,
            ComBordadoEmbaixoDoNome,
            comBordados,
            bordadosSemONome,
            bordadoDoNome,
            produtoAberto
        }
    }

});
</script>

<style type="text/css"></style>
  