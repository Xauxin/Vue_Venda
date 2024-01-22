<template>
    <v-card class="ma-1">
        <v-card-title @click.prevent="console.log(produtoAbertoStore.$state, 'obg', console.log(modelagemFoiEscolhida))"
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
        const { cor, tecido, tamanho } = storeToRefs(produtoAbertoStore)
        const base = {cor, tecido, tamanho}
        //Validador de Nome do Produto
        watch(
            () => produtoAbertoStore.nome,
            (newValue, oldValue): any => {
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
        //Validador de Modelagem do Produto
        watch(
            () => produtoAbertoStore.modelagem,
            (): any => {
                modelagemFoiEscolhida.value = true
                Object.entries(esquemaStore.modelagemObrigatoria).forEach((modelagem:[string,any])=>{
                    const [key, value] = modelagem
                    if (value && !produtoAbertoStore.modelagem[key]){
                        modelagemFoiEscolhida.value = false
                    }
                })
                console.log(modelagemFoiEscolhida.value)
            },{deep: true} 
        )
        //Validador da Base do Produto
        watch(
            () => base,
            (): any => {
                baseFoiEscolhida.value = true
                Object.entries(base).forEach((base:[string,any])=>{
                    const value = base[1]
                    if (!value.value){
                        baseFoiEscolhida.value = false
                    }
                })
                console.log(baseFoiEscolhida.value)
            },{deep: true} 
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
  