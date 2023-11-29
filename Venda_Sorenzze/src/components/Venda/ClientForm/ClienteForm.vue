<template>
  <v-card class="ma-1">
    <v-card-title @click="console.log(storeVenda.$state)"
      class="text-center text-body-1 py-0 tituloCard">Cliente</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="px-3 py-2 mx-0">
      <v-row>
        <v-col>
          <v-autocomplete hide-details label="Cliente" density="compact" v-model="pessoaEscolhida" :items=nomesPessoas()
            variant="outlined" append-inner-icon="add" auto-select-first menu-icon="">
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete hide-details label="Tipo" v-model="tipo" density="compact" :items="['Pedido', 'Orçamento', 'Registro']"
            variant="outlined" auto-select-first>
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-text-field hide-details variant="outlined" density="compact" label="Venda" prefix="N.º" readonly
            :model-value="id"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field hide-details readonly variant="outlined" density="compact" label="Dt.Registro"
            :model-value="data"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
    
<script lang="ts">
import { IPessoa } from '@/interfaces/Pessoas'
import { usePessoasStore } from '@/store/Pessoas'
import { useVendaAbertaStore } from '@/store/VendaAberta'
import { computed, defineComponent, onMounted, ref } from 'vue'


export default defineComponent({
  name: 'ClientForm',
  components: {

  },
  data() {
    return {
      pessoaEscolhida: "" as string,
    }
  },
  methods: {
    nomesPessoas() {
      let lista = [] as String[]
      this.pessoas.forEach(pessoa => {
        lista.push(pessoa.nome)
      })
      return lista
    }
  },
  watch: {
    pessoaEscolhida() {
      this.storeVenda.setPessoaVenda(this.pessoaEscolhida)
    },
    tipo(){
      this.storeVenda.setTipo(this.tipo)
    }
  },
  setup() {
    const storeVenda = useVendaAbertaStore()
    const storePessoas = usePessoasStore()
    const pessoas = ref([] as IPessoa[])
    const tipo = ref("" as string)
    onMounted(async () => {
      try {
        storeVenda.AbrirVenda()
        pessoas.value = storePessoas.getPessoas
        tipo.value = storeVenda.getTipoVenda
      } catch (error) {
        console.log(error)
      }
    })
    const data = computed(() => storeVenda.getDataEmString as string)
    const id = computed(() => JSON.stringify(storeVenda.getId) as string)
    return {
      tipo,
      data,
      id,
      storeVenda,
      pessoas,

    }
  }
})
</script>
    