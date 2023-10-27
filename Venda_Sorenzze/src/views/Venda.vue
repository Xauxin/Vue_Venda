<template>
    <h1>Nova Venda</h1>
    <ClientForm></ClientForm>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import ClientForm from "@/components/Venda/ClienteForm.vue"

  export default defineComponent({
    name: 'Venda',
    components:{
     ClientForm
    }
  })
  </script>
  