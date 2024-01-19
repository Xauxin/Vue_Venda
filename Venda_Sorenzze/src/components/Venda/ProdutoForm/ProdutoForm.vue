<template>
    <v-card class="ma-1">
        <v-card-title @click.prevent="console.log(produtoAbertoStore.$state)"
            class="text-center text-body-1 py-0 tituloCard">Produto</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="px-0 py-2 mx-0">
            <BaseProduto ref="base" :opcoes-de-esquema="(opcoesDeEsquema as String[])"
                :esquema-escolhido="esquemaStore.esquema_escolhido ? esquemaStore.esquema_escolhido : ({} as IEsquemaProduto)">
            </BaseProduto>
            <v-container class="pa-0 ma-0" v-if="nomeFoiEscolhido">
                <ModelagemProduto
                    :esquemaModelagemEscolhida="esquemaStore.esquema_escolhido ? esquemaStore.esquema_escolhido.modelagem : {}"
                    :modelagemObrigatorias="modelagemObrigatoria" />
                <v-container class="px-3 py-2">
                    <v-row>
                        <v-col cols="4" class="pb-1">
                            <MedidasProduto
                                :esquemaMedidasEscolhidas="esquemaStore.esquema_escolhido ? esquemaStore.esquema_escolhido.medidas : {}"
                                :esquemaMaisMedidasEscolhidas="esquemaStore.esquema_escolhido ? esquemaStore.esquema_escolhido.mais_medidas : {}">
                            </MedidasProduto>
                        </v-col>
                        <v-col cols="8" class="pb-1">
                            <BordadosProduto :esquema-escolhido="esquemaStore.esquema_escolhido"></BordadosProduto>
                        </v-col>
                    </v-row>
                </v-container>
            </v-container>
        </v-card-text>
        <v-card-actions v-if="nomeFoiEscolhido" class="px-0 mx-0">
            <PrecoProduto class="px-5 py-1" />
        </v-card-actions>
    </v-card>
</template>
  
<script lang="ts">
import BaseProduto from './BaseProduto/BaseProduto.vue';
import ModelagemProduto from './ModelagemProduto/ModelagemProduto.vue'
import MedidasProduto from './MedidasProduto/MedidasProduto.vue'
import BordadosProduto from './BordadoProduto/BordadosProduto.vue'
import PrecoProduto from './PrecoProduto/PrecoProduto.vue';
import { computed, defineComponent, ref, watch } from 'vue'
import { useProdutoAbertoStore } from '@/store/ProdutoAberto';
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto';
import { IBordados } from '@/interfaces/Bordado';
import { IModelagem, IMedidas } from '@/interfaces/Produto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos';
import { storeToRefs } from 'pinia';


export default defineComponent({
    name: 'ProdutoForm',
    components: {
        BaseProduto,
        ModelagemProduto,
        MedidasProduto,
        BordadosProduto,
        PrecoProduto
    },
    data() {
        return {
        }
    },
    computed: {
        modelagemObrigatoria() {
            const modelagemObrigatoria = {} as { [key: string]: boolean }
            if (this.esquemaStore.esquema_escolhido) {
                Object.entries(this.esquemaStore.esquema_escolhido.modelagem).forEach(modelagem => {
                    modelagemObrigatoria[modelagem[0]] = modelagem[1].required
                })
                return modelagemObrigatoria
            }
            return {}
        }
    },
    setup() {
        const esquemaStore = useEsquemaProdutoStore()
        const produtoAbertoStore = useProdutoAbertoStore()
        let nomeFoiEscolhido = ref(false)
        let modelagemFoiEscolhida = ref(false)
        let baseFoiEscolhida = ref(false)
        watch(
            () => produtoAbertoStore.nome,
            (newValue, oldValue): any => {
                console.log('old', oldValue, 'new', newValue)
                if (newValue && !oldValue){
                    esquemaStore.setEscolhido(newValue)
                    nomeFoiEscolhido.value = true
                }else if (!newValue && oldValue){
                    nomeFoiEscolhido.value = false
                    produtoAbertoStore.$reset()
                    produtoAbertoStore.abrirProduto
                    esquemaStore.setEscolhido("")
                }else if(newValue && oldValue){
                    produtoAbertoStore.resetexcludente(['nome'])
                    esquemaStore.setEscolhido(newValue)
                }
            } 
        )
        let opcoesDeEsquema = computed(() => esquemaStore.getStrListEsquemas)
        return {
            esquemaStore,
            produtoAbertoStore,
            nomeFoiEscolhido,
            baseFoiEscolhida,
            modelagemFoiEscolhida,
            opcoesDeEsquema
        }
    }
})
</script>

<style lang="scss" scoped>
@use 'vuetify/settings' with ($card-border: (#e5e0ff,
        solid,
        1px,
    ));

.tituloCard {
    background-color: #e5e0ff;

}
</style>
  