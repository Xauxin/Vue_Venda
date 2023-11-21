<template>
  <v-row no-gutters>
    <v-col cols="7" class="ma-0 pa-0">
      <v-row class="ma-0 pa-0">
        <v-col class="ma-0 pa-0">
          <ClientForm></ClientForm>
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0">
        <v-col class="ma-0 pa-0">
          <ProdutoForm v-if="clienteFoiEscolhido"></ProdutoForm>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="5" class="ma-0 pa-0">
          <ResumoVenda></ResumoVenda>
    </v-col>
  </v-row>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import ClientForm from "@/components/Venda/ClientForm/ClienteForm.vue"
import ProdutoForm from '@/components/Venda/ProdutoForm/ProdutoForm.vue';
// import TabelaProdutos from '@/components/Venda/ResumoVenda/TabelaProdutos.vue';
import ResumoVenda from '@/components/Venda/ResumoVenda/ResumoVenda.vue';
import { useVendaAbertaStore } from '@/store/VendaAberta';

export default defineComponent({
  name: 'Venda',
  components: {
    ClientForm,
    ProdutoForm,
    // TabelaProdutos
    ResumoVenda
  },
  setup() {
    //Ascessa store de venda e cria varia mutáveal ligada ao cliente que foi escolhido
    const vendaAbertaStore = useVendaAbertaStore()
    const clienteFoiEscolhido = ref(false as boolean)
    watch(
      () => vendaAbertaStore.getpessoaFoiEscolhida,
      () => {
        clienteFoiEscolhido.value = vendaAbertaStore.getpessoaFoiEscolhida
      }
    )
    return {
      clienteFoiEscolhido
    }
  }
})
</script>
  