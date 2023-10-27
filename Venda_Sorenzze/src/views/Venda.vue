<template>
  <v-row>
    <v-col cols="9">
      <v-row>
        <v-col>
          <ClientForm></ClientForm>
        </v-col>
      </v-row>
        <v-col>
          <v-divider thickness="5" class="border-opacity-100"></v-divider>
        </v-col>
      <v-row>
        <ProdutoForm></ProdutoForm>
      </v-row>
    </v-col>
  </v-row>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import ClientForm from "@/components/Venda/ClienteForm.vue"
import ProdutoForm from '@/components/Venda/ProdutoForm.vue';

export default defineComponent({
  name: 'Venda',
  components: {
    ClientForm,
    ProdutoForm
  }
})
</script>
  