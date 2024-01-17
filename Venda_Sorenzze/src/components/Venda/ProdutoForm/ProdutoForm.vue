<template>
    <v-card class="ma-1">
        <v-card-title @click.prevent="console.log(produtoAbertoStore.$state)" class="text-center text-body-1 py-0 tituloCard">Produto</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="px-0 py-2 mx-0">
            <BaseProduto
                ref="base"
                @set-nome="setState"
                @set-base="setState"
                :opcoes-de-esquema="(opcoesDeEsquema as String[])"
                :esquema-escolhido="esquemaStore.esquema_escolhido ? esquemaStore.esquema_escolhido  : ({} as IEsquemaProduto)"
                >
            </BaseProduto>
            <v-container class="pa-0 ma-0" v-if="nomeProdutoFoiEscolhido">
                <ModelagemProduto 
                    :esquemaModelagemEscolhida="esquemaStore.esquema_escolhido ? esquemaStore.esquema_escolhido.modelagem : {}"
                    :modelagemObrigatorias="modelagemObrigatoria"
                    />
                <v-container class="px-3 py-2">
                    <v-row>
                        <v-col cols="4" class="pb-1">
                            <MedidasProduto 
                                :esquemaMedidasEscolhidas="esquemaStore.esquema_escolhido ? esquemaStore.esquema_escolhido.medidas : {}"
                                :esquemaMaisMedidasEscolhidas="esquemaStore.esquema_escolhido ? esquemaStore.esquema_escolhido.mais_medidas : {}">
                            </MedidasProduto>
                        </v-col>
                        <v-col cols="8" class="pb-1">
                            <BordadosProduto
                            :esquema-escolhido="esquemaStore.esquema_escolhido"
                            @set-bordados="setState"
                            ></BordadosProduto>
                        </v-col>
                    </v-row>
                </v-container>
            </v-container>
        </v-card-text>
        <v-card-actions v-if="nomeProdutoFoiEscolhido" class="px-0 mx-0">
            <PrecoProduto @reseta-produto="resetaProduto" class="px-5 py-1"/>
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
import { IBordados } from '@/interfaces/Bordado';
import { IModelagem, IMedidas } from '@/interfaces/Produto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos';

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
            if(this.esquemaStore.esquema_escolhido){
                Object.entries(this.esquemaStore.esquema_escolhido.modelagem).forEach(modelagem => {
                        modelagemObrigatoria[modelagem[0]] = modelagem[1].required
                })
                return modelagemObrigatoria
            }
            return {}
        }
    },
    methods:{
        setState(valor:string|IModelagem|IMedidas|IBordados|number|Object, campo:string){
            if(campo == 'nome' && valor){
                this.produtoAbertoStore.setter(campo, (valor as string))
                this.esquemaStore.SetEscolhido(valor as string)
            }else if(campo == 'nome' && !valor){
                this.produtoAbertoStore.setter(campo, (valor as string))
                this.esquemaStore.SetEscolhido("")
            } 
            if(campo == 'base'){
                Object.entries(valor).forEach((dado:[string,string]) =>{
                    const [key,value] = dado
                    this.produtoAbertoStore.setter(key, (value as string))
                })
            }
            if(campo == 'bordados'){
                this.produtoAbertoStore.setter(campo, (valor as IBordados))
            }   
        },
        resetaProduto(){
            (this.$refs  as typeof BaseProduto).base.reset()
        }
    },
    setup (){
        //Ascessa store de esquema e cria varia mutáveal ligada ao produtro que foi escolhido
        const esquemaStore = useEsquemaProdutoStore()
        
       ''
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
                opcoesDeEsquema.value = esquemaStore.getStrListEsquemas
            } catch (error) {
                console.log(error)
            }
        })
        return{
            esquemaStore,
            produtoAbertoStore,
            nomeProdutoFoiEscolhido,
            opcoesDeEsquema
        }
    }
})
</script>

<style lang="scss" scoped>
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
  