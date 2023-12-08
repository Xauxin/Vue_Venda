<!-- eslint-disable vue/valid-v-slot -->
<template>
    <TabelaVendas></TabelaVendas>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <v-card-title>
          Venda  N.º{{ ultimaVenda.id }} salva Com sucesso
        </v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
  
<script lang="ts">


import { defineComponent } from 'vue'
// import { useDate } from 'vuetify/lib/framework.mjs';
import TabelaVendas from '@/components/Vendas/TabelaVendas.vue'
import { usePessoasStore } from '@/store/Pessoas'
import { useVendasStore } from '@/store/Vendas'
import { IVenda } from '@/interfaces/Venda'


export default defineComponent({
    name: 'Vendas',
    components: {
        TabelaVendas
    },
    data(){
        return{
            dialog: false as boolean,
            ultimaVenda: {} as IVenda
        }
    },
    async beforeRouteEnter(to, from, next){
        const vendasStore = useVendasStore()
        const pessoasStore = usePessoasStore()
        vendasStore.$reset()
        await vendasStore.listVendas()
        await pessoasStore.listPessoas()
        const ultimaVenda = vendasStore.getUltimaVendaAdicionada
        if (from.name == "Venda" && ultimaVenda.id){
            next(vm => {
              (vm as any).ultimaVenda = ultimaVenda;
              (vm as any).dialog = true;
            })
        }else{
            next()
        }
    },
    

})
</script>

