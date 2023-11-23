<template>
    <v-card class="ma-1">
        <v-card-title class="text-center text-body-1 py-0 tituloCard">Produto</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="px-0 py-2 mx-0">
            <BaseProduto
                @set-nome="setState" 
                :opcoes-de-esquema="(opcoesDeEsquema as String[])"
                :esquema-escolhido="esquemaEscolhido ? esquemaEscolhido : ({} as IEsquemaProduto )"
                >
            </BaseProduto>
            <v-container class="pa-0 ma-0" v-if="nomeProdutoFoiEscolhido">
                <ModelagemProduto 
                    :esquemaModelagemEscolhida="esquemaEscolhido ? esquemaEscolhido.modelagem : {}"
                    :modelagemObrigatorias="modelagemObrigatoria"
                    />
                <v-container class="px-3 py-2">
                    <v-row>
                        <v-col cols="4" class="pb-1">
                            <MedidasProduto 
                                :esquemaMedidasEscolhidas="esquemaEscolhido ? esquemaEscolhido.medidas : {}"
                                :esquemaMaisMedidasEscolhidas="esquemaEscolhido ? esquemaEscolhido.mais_medidas : {}">
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
import BaseProduto from './BaseProduto/BaseProduto.vue';
import ModelagemProduto from './ModelagemProduto.vue'
import MedidasProduto from './MedidasProduto/MedidasProduto.vue'
import BordadosProduto from './BordadoProduto/BordadosProduto.vue'
import PrecoProduto from './PrecoProduto/PrecoProduto.vue';
import { defineComponent, onMounted, ref , watch } from 'vue'
import { useProdutoAbertoStore } from '@/store/ProdutoAberto';
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto';
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos';
import { IBordados } from '@/interfaces/Bordado';
import { IModelagem, IMedidas } from '@/interfaces/Produto';


export default defineComponent({
    name: 'ProdutoForm',
    components: {
        BaseProduto,
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
            if(this.esquemaEscolhido){
                Object.entries(this.esquemaEscolhido.modelagem).forEach(modelagem => {
                        modelagemObrigatoria[modelagem[0]] = modelagem[1].required
                })
                return modelagemObrigatoria
            }
            return {}
        }
    },
    methods:{
        setState(valor:string|IModelagem|IMedidas|IBordados|number, campo:string){
            this.produtoAbertoStore.setter(campo, valor)
            if(campo == 'nome'){
                const id = (valor as string).split(" - ")[0] as string
                this.esquemaStore.SetEscolhido(id)
            }
        }
    },
    setup (){
        //Ascessa store de esquema e cria varia mutáveal ligada ao produtro que foi escolhido
        const esquemaStore = useEsquemaProdutoStore()
        const esquemaEscolhido = ref(null as IEsquemaProduto| null)
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
            () => produtoAbertoStore.getNomeFoiEscolhido,
            () => {
                nomeProdutoFoiEscolhido.value = produtoAbertoStore.getNomeFoiEscolhido
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
            esquemaStore,
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
  