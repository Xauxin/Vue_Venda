<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-autocomplete label="Cliente" :items=items variant="outlined" append-inner-icon="add" auto-select-first menu-icon="">
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete label="Tipo" :items="['Pedido', 'Orçamento', 'Registro']" variant="outlined"
            append-inner-icon="add" auto-select-first menu-icon="">
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-text-field variant="outlined" label="Venda" readonly model-value="Nº001"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field readonly variant="outline" label="Dt.Registro" :model-value=data_em_string()></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
    
<script lang="ts">
import { defineComponent } from 'vue'
import { useDate } from 'vuetify/labs/date'

export default defineComponent({
  name: 'ClientForm',
  components: {

  },
  data() {
    return {
      items: ['Dalton', 'Jayne', 'Fátima', 'Sandra', 'Nina', 'Noely']
    }
  },
  methods:{
    data_em_string():String{
      const data = new Date()
      const date = useDate() as useDate
      return  date.format(data, "dayOfMonth")
    }
  }
})
</script>
    