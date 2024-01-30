<template>
  <h1>Produtos</h1>
  <v-row align="center">
    <v-col cols="3">
      <v-card title="Adicionar Produto" @click.prevent="abrirAdicionarProduto">
        <v-card-subtitle>
          Adicionar um produto para ser usado em vendas
        </v-card-subtitle>

        <v-card-text>
          <v-img
            src="https://static.vecteezy.com/system/resources/previews/000/363/962/non_2x/vector-plus-sign-line-black-icon.jpg"
            :width="300"></v-img>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4" v-for="(value, key) in esquemas" :key="key">
      <v-container>
        <v-card>
          <v-card-title>
            {{ value.nome }}
          </v-card-title>
          <v-card-subtitle>
            {{ value.suprimentos }}
          </v-card-subtitle>
          <v-card-text>
            <v-img src="https://github.com/Xauxin.png" :width="300"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="tonal">Editar</v-btn>
            <v-spacer></v-spacer>
            <v-btn variant="tonal">Copiar</v-btn>
            <v-spacer></v-spacer>
            <v-btn variant="tonal">Excluir</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-col>
  </v-row>
</template>
  
<script lang="ts">

import router from '@/router';
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'Catalogo',
  components: {

  },
  methods:{
    abrirAdicionarProduto(){}
     
  },
  async beforeRouteEnter(to, from, next) {
    const esquemaProdutos = useEsquemaProdutoStore()
    await esquemaProdutos.listEsquemas()
    next()
  },
  setup() {
    const esquemaProdutos = useEsquemaProdutoStore()
    const { esquemas } = storeToRefs(esquemaProdutos)
    console.log(esquemas.value)
    return {
      esquemas
    }
  }
})
</script>
  