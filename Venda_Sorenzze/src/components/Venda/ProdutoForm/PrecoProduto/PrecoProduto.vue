<template>
        <v-row align="center">
            <v-col cols="3" class="py-0">
                <v-text-field density="compact" class="inputPreco" prefix="R$" type="number" label="Preço" variant="outlined"
                    v-model="valorProduto" hide-details/>
            </v-col>
            <v-col cols="2" class="py-0">
                <v-text-field density="compact"  type="number" label="Quantidade" variant="outlined" 
                    auto-select-first menu-icon="" v-model="quantidadeProduto" hide-details>
                </v-text-field>
            </v-col>
            <v-col cols="3" class="py-0">
                <v-text-field density="compact" type="number" prefix="R$" label="Valor Total" variant="outlined" 
                    auto-select-first menu-icon="" hide-details readonly :model-value="valorConjuntoProdutos">
                </v-text-field>
            </v-col>
            <v-col aling="center">
                <v-row>
                    <v-col cols="4">
                        <v-btn :disabled="!produtoValido" color="success" @click.prevent="adicionarProduto" density="compact" variant="elevated" style="font-size: 10px;">
                            Adicionar
                        </v-btn>
                    </v-col>
                    <v-col cols="4">
                        <v-btn :disabled="!produtoValido" color="info" density="compact" variant="elevated" style="font-size: 10px;">
                            Guardar
                        </v-btn>
                    </v-col>
                    <v-col cols="4">
                        <v-btn :disabled="!produtoValido" color="red" density="compact" variant="elevated" style="font-size: 10px;">
                            Excluir
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

</template>
  
<script lang="ts">


import { useProdutoAbertoStore } from '@/store/ProdutoAberto'
import { useVendaAbertaStore } from '@/store/VendaAberta'
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
    name: 'PrecoProdutos',
    components: {

    },
    data() {
        return {
            produtoValido : false as boolean,
            comPreco: false as boolean,
            valorProduto: NaN as number,
            quantidadeProduto: 1 as number
        }
    },
    computed: {
        valorConjuntoProdutos() {
            const valorConjuntoProdutos = this.valorProduto * this.quantidadeProduto as number
            return valorConjuntoProdutos
        }
    },
    methods:{
        ValidaProduto(){
            if (this.comPreco && this.escolhasValidas){
                this.produtoValido = true
            }
        },
        adicionarProduto(){
            this.produtoAbertoStore.setPrecoEQuantidadeProduto(this.valorProduto, this.quantidadeProduto)
            const produto = this.produtoAbertoStore.getProdutoInteiro
            this.vendaAbertaStore.setProduto(produto)
        }
    },
    watch:{
        valorProduto(){
            if (this.valorProduto > 0){
                this.comPreco = true
            }
        },
        comPreco: 'ValidaProduto',
        escolhasValidas: 'ValidaProduto'
    },
    setup() {
        const produtoAbertoStore = useProdutoAbertoStore();
        const vendaAbertaStore = useVendaAbertaStore()
        const escolhasValidas = ref(false as boolean)
        watch(
            ([()=> produtoAbertoStore.getbaseFoiEscolhida, ()=> produtoAbertoStore.getmodelagemFoiEscolhida]),([newBase, newModelagem]) => {
                if (newBase && newModelagem) {
                    console.log('escolhasValidas')
                    escolhasValidas.value = true
                }else{
                    escolhasValidas.value = false
                }
                
            },
            {deep: true})
        return{
            escolhasValidas,
            vendaAbertaStore,
            produtoAbertoStore
        }
    }   
})
</script>
<style scoped>
.inputPreco :deep(.input)[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
.inputPreco :deep(.input)::-webkit-outer-spin-button,
.inputPreco :deep(.input)::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
