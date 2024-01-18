<template>
  <v-card class="ma-1">
    <v-card-title @click="console.log(storeVenda.$state)"
      class="text-center text-body-1 py-0 tituloCard">Cliente</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="px-3 py-2 mx-0">
      <v-row>
        <v-col>
          <v-autocomplete hide-details hide-spin-buttons label="Cliente" density="compact" v-model="storeVenda.pessoaVenda.nome" 
            :items=pessoas variant="outlined" append-inner-icon="add" auto-select-first item-title="nome" @update:modelValue="setPessoa($event)"
            item-children="nome" :readonly="!storeVenda.novaVenda">
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete hide-details label="Tipo" v-model="storeVenda.tipo" density="compact" :readonly="!storeVenda.novaVenda"
            :items="['Pedido', 'Orçamento', 'Registro']" variant="outlined" auto-select-first>
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-text-field hide-details variant="outlined" density="compact" label="Venda" prefix="N.º" readonly
            :model-value="id"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field hide-details readonly variant="outlined" density="compact" label="Dt.Registro"
            :model-value="data_de_registro"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
    
<script lang="ts">
import { IPessoa } from '@/interfaces/Pessoas'
import { usePessoasStore } from '@/store/Pessoas'
import { useVendaAbertaStore } from '@/store/VendaAberta'
import { storeToRefs } from 'pinia'
import { defineComponent, ref } from 'vue'



export default defineComponent({
  name: 'ClientForm',
  components: {

  },
  data() {
    return {
    }
  },
  methods: {
    nomesPessoas() {
      let lista = [] as String[]
      this.pessoas.forEach(pessoa => {
        lista.push(pessoa.nome)
      })
      return lista
    },
    setPessoa(nome:string){
      this.storeVenda.setPessoaVenda(nome)
    }
  },
  watch: {
    tipo() {
      this.storeVenda.setTipo(this.tipo)
    }
  },
  setup() {
    const storeVenda = useVendaAbertaStore()
    const storePessoas = usePessoasStore()
    const pessoas = ref(storePessoas.getPessoas as IPessoa[])
    const {tipo, data_de_registro, id} = storeToRefs(storeVenda)

    return {
      // pessoaEscolhida,
      tipo,
      data_de_registro,
      id,
      storeVenda,
      pessoas,

    }
  }
})
</script>
    