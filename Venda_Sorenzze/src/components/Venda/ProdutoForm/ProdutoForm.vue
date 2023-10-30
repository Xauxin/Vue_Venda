<template>
    <v-form>
        <FormEsquemaProduto></FormEsquemaProduto>
        <ModelagemProduto/>
        <v-container class="px-5 py-2">
            <v-row  no-gutters>
                <v-col cols="4">
                    <MedidasProduto></MedidasProduto>
                </v-col>
                <v-col cols="8" >
                    <BordadosProduto></BordadosProduto>
                </v-col>
            </v-row>
        </v-container>
        <PrecoProduto/>
    </v-form>
</template>
  
<script lang="ts">
import FormEsquemaProduto from './FormEsquemaProduto.vue';
import ModelagemProduto from './ModelagemProduto.vue'
import MedidasProduto from './MedidasProduto.vue'
import BordadosProduto from './BordadosProduto.vue'
import PrecoProduto from './PrecoProduto.vue';

import { defineComponent } from 'vue'
export default defineComponent({
    name: 'ProdutoForm',
    components: {
        FormEsquemaProduto,
        ModelagemProduto,
        MedidasProduto,
        BordadosProduto,
        PrecoProduto
    },

})
</script>
  