<template>
  <v-row>
    <v-col cols="7">
      <v-row>
        <v-col>
          <ClientForm></ClientForm>
        </v-col>
      </v-row>
      <v-col>
        <v-divider thickness="1" class="border-opacity-100"></v-divider>
      </v-col>
      <v-row>
        <v-col>
          <ProdutoForm v-if="clienteFoiEscolhido"></ProdutoForm>
        </v-col>
      </v-row>
    </v-col>
    <v-divider thickness="1" class="border-opacity-100" vertical></v-divider>
    <v-col cols="5">
      <TabelaProdutos></TabelaProdutos>
    </v-col>
  </v-row>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import ClientForm from "@/components/Venda/ClientForm/ClienteForm.vue"
import ProdutoForm from '@/components/Venda/ProdutoForm/ProdutoForm.vue';
import TabelaProdutos from '@/components/Venda/TabelaProdutos.vue';
import { useVendaAbertaStore } from '@/store/VendaAberta';

export default defineComponent({
  name: 'Venda',
  components: {
    ClientForm,
    ProdutoForm,
    TabelaProdutos
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
  