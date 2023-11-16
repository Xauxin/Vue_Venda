<template>
    <v-form>
        <FormEsquemaProduto :opcoes-de-esquema="(opcoesDeEsquema as String[])"></FormEsquemaProduto>
        <v-container class="pa-0 ma-0" v-if="nomeProdutoFoiEscolhido">
            <ModelagemProduto :esquemaModelagemEscolhida="esquemaEscolhido.modelagem"/>
            <v-container class="px-5 py-2">
                <v-row>
                    <v-col cols="4">
                        <MedidasProduto 
                            :esquemaMedidasEscolhidas="esquemaEscolhido.medidas"
                            :esquemaMaisMedidasEscolhidas="esquemaEscolhido.mais_medidas">
                        </MedidasProduto>
                    </v-col>
                    <v-col cols="8" >
                        <BordadosProduto></BordadosProduto>
                    </v-col>
                </v-row>
            </v-container>
            <PrecoProduto class="px-5 py-2"/>
        </v-container>
    </v-form>
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
            console.log('mounted')
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
  