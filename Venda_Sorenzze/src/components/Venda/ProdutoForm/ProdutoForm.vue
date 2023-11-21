<template>
    <v-card class="ma-1">
        <v-card-title class="text-center text-body-1 py-0 tituloCard">Produto</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="px-0 py-2 mx-0">
            <FormEsquemaProduto :opcoes-de-esquema="(opcoesDeEsquema as String[])"></FormEsquemaProduto>
            <v-container class="pa-0 ma-0" v-if="nomeProdutoFoiEscolhido">
                <ModelagemProduto 
                    :esquemaModelagemEscolhida="esquemaEscolhido.modelagem"
                    :modelagemObrigatorias="modelagemObrigatoria"
                    />
                <v-container class="px-3 py-2">
                    <v-row>
                        <v-col cols="4" class="pb-1">
                            <MedidasProduto 
                                :esquemaMedidasEscolhidas="esquemaEscolhido.medidas"
                                :esquemaMaisMedidasEscolhidas="esquemaEscolhido.mais_medidas">
                            </MedidasProduto>
                        </v-col>
                        <v-col cols="8" class="pb-1">
                            <BordadosProduto></BordadosProduto>
                        </v-col>
                    </v-row>
                </v-container>
            </v-container>
        </v-card-text>
        <v-card-actions v-if="nomeProdutoFoiEscolhido" class="px-0 mx-0">
            <PrecoProduto class="px-5 py-1"/>
        </v-card-actions>
    </v-card>
</template>
  
<script lang="ts">
import FormEsquemaProduto from './FormEsquemaProduto.vue';
import ModelagemProduto from './ModelagemProduto.vue'
import MedidasProduto from './MedidasProduto/MedidasProduto.vue'
import BordadosProduto from './BordadoProduto/BordadosProduto.vue'
import PrecoProduto from './PrecoProduto/PrecoProduto.vue';
import { defineComponent, onMounted, ref , watch } from 'vue'
import { useProdutoAbertoStore } from '@/store/ProdutoAberto';
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto';
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos';


export default defineComponent({
    name: 'ProdutoForm',
    components: {
        FormEsquemaProduto,
        ModelagemProduto,
        MedidasProduto,
        BordadosProduto,
        PrecoProduto
    },
    data(){
        return{
        }
    },
    computed:{
        modelagemObrigatoria(){
            const modelagemObrigatoria = {} as { [key:string]: boolean}
            Object.entries(this.esquemaEscolhido.modelagem).forEach(modelagem => {
                    modelagemObrigatoria[modelagem[0]] = modelagem[1].required
            })
            return modelagemObrigatoria
        }
    },
    setup (){
        //Ascessa store de esquema e cria varia mutáveal ligada ao produtro que foi escolhido
        const esquemaStore = useEsquemaProdutoStore()
        const esquemaEscolhido = ref({} as IEsquemaProduto)
        watch(
            () => esquemaStore.getEsquema,
            () => {
                esquemaEscolhido.value = esquemaStore.getEsquema
            }
        )
       
        //Ascessa store do produto aberto e cria varia mutáveal ligada ao produto que foi escolhido
        const produtoAbertoStore = useProdutoAbertoStore()
        const nomeProdutoFoiEscolhido = ref(false as boolean)
        watch(
            () => produtoAbertoStore.getnomeProdutoFoiEScolhido,
            () => {
                nomeProdutoFoiEscolhido.value = produtoAbertoStore.getnomeProdutoFoiEScolhido
            }
        )
        //Acessa store de Esquema e pega as opções possiveis para venda
        let opcoesDeEsquema = ref([] as String[])
        onMounted(async () => {
            opcoesDeEsquema.value = []
            try {
                await esquemaStore.listOpcoes()
                opcoesDeEsquema.value = esquemaStore.getOpcoesDeEsquema
            } catch (error) {
                console.log(error)
            }
        })
       
        return{
            produtoAbertoStore,
            nomeProdutoFoiEscolhido,
            esquemaEscolhido,
            opcoesDeEsquema
        }
    }
})
</script>

<style lang="scss">
@use 'vuetify/settings' with(
    $card-border:(
        #e5e0ff,
        solid,
        1px,
    )
);

.tituloCard {
    background-color: #e5e0ff;

}

</style>
  