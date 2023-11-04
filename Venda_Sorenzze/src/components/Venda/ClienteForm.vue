<template>
  <v-form>
    <v-container class="pb-0">
      <v-row>
        <v-col >
          <v-autocomplete  hide-details label="Cliente" density="compact" :items=numeroENomePessoas() variant="outlined" append-inner-icon="add" auto-select-first menu-icon="">
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete  hide-details  label="Tipo" density="compact" :items="['Pedido', 'Orçamento', 'Registro']" variant="outlined" auto-select-first>
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-text-field  hide-details variant="outlined" density="compact" label="Venda" readonly model-value="Nº001"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field  hide-details readonly variant="outlined" density="compact" label="Dt.Registro" :model-value=data_em_string()></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
    
<script lang="ts">
import { IPessoa } from '@/interfaces/Pessoas'
import { useAppStore } from '@/store/app'
import { defineComponent, onMounted, ref } from 'vue'
import { useDate } from 'vuetify/labs/date'

export default defineComponent({
  name: 'ClientForm',
  components: {

  },
  data() {
    return {
      data : new Date(), 
      items: ['Dalton', 'Jayne', 'Fátima', 'Sandra', 'Nina', 'Noely']
    }
  },
  methods:{
    data_em_string():String{
      const date = useDate()
      let data_string = date.format(this.data, "keyboardDate").split("/") as String[] || []
      return `${data_string[1]}/${data_string[0]}/${data_string[2]}`
    
    },
    numeroENomePessoas(){
      let lista = [] as String[]
      this.pessoas.forEach(pessoa =>{
        let numeroENome = `[${pessoa.id}]- ${pessoa.nome}`
        lista.push(numeroENome)
      })
      return lista
    }
  },
  setup() {
        const store = useAppStore()
        const pessoas = ref([] as IPessoa[])

        onMounted(async () => {
                try {
                    await store.listPessoas()
                    pessoas.value = store.getPessoas as IPessoa[]
                } catch (error) {
                    console.log(error)
                }
            })

        return {
            pessoas: pessoas,
        }
    }

  })
</script>
    