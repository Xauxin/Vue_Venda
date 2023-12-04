<!-- eslint-disable vue/valid-v-slot -->
<template>
    <TabelaVendas></TabelaVendas>
</template>
  
<script lang="ts">


import { defineComponent } from 'vue'
// import { useDate } from 'vuetify/lib/framework.mjs';
import TabelaVendas from '@/components/vendas/TabelaVendas.vue'


export default defineComponent({
    name: 'Vendas',
    components: {
        TabelaVendas
    },})
</script>

