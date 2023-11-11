<template>
    <v-form v-if="clienteFoiEscolhido">
        <FormEsquemaProduto></FormEsquemaProduto>
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
import { useVendaAbertaStore} from '@/store/VendaAberta';
import { defineComponent, ref , watch } from 'vue'
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
            () => produtoAbertoStore.getnomeProdutoFoiEScolhido,
            () => {
                nomeProdutoFoiEscolhido.value = produtoAbertoStore.getnomeProdutoFoiEScolhido
            }
        )
        //Ascessa store de venda e cria varia mutáveal ligada ao cliente que foi escolhido
        const vendaAbertaStore = useVendaAbertaStore()
        const clienteFoiEscolhido = ref(false as boolean)
        watch(
            () => vendaAbertaStore.getpessoaFoiEscolhida,
            () => {
                clienteFoiEscolhido.value = vendaAbertaStore.getpessoaFoiEscolhida
            }
        )
        //Ascessa store do produto aberto e cria varia mutáveal ligada ao produto que foi escolhido
        const produtoAbertoStore = useProdutoAbertoStore()
        const nomeProdutoFoiEscolhido = ref(false as boolean)
        watch(
            () => esquemaStore.getEsquema,
            () => {
                esquemaEscolhido.value = esquemaStore.getEsquema
            }
        )
        return{
            produtoAbertoStore,
            clienteFoiEscolhido,
            nomeProdutoFoiEscolhido,
            esquemaEscolhido,
        }
    }
})
</script>
  