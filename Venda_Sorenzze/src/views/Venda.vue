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
        <ProdutoForm></ProdutoForm>
      </v-row>
    </v-col>
    <v-divider thickness="1" class="border-opacity-100" vertical></v-divider>
    <v-col cols="5">
      <TabelaProdutos></TabelaProdutos>
    </v-col>
  </v-row>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import ClientForm from "@/components/Venda/ClienteForm.vue"
import ProdutoForm from '@/components/Venda/ProdutoForm/ProdutoForm.vue';
import TabelaProdutos from '@/components/Venda/TabelaProdutos.vue';

export default defineComponent({
  name: 'Venda',
  components: {
    ClientForm,
    ProdutoForm,
    TabelaProdutos
  }
})
</script>
  