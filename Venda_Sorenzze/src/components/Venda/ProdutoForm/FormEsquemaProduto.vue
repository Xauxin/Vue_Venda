<template>
    <v-container class="px-5 py-2" fluid height="50%">
        <v-row height="50%">
            <v-col>
                <v-autocomplete density="compact" label="Produto" v-model="escolhido"  variant="outlined" :items="opcoes"
                    auto-select-first hide-details>
                </v-autocomplete>
            </v-col>
            <v-col>
                <v-autocomplete density="compact" hide-details label="Cor" :items=opcaoEscolhida.cor variant="outlined"
                    auto-select-first>
                </v-autocomplete>
            </v-col>
            <v-col>
                <v-autocomplete :items="opcaoEscolhida.tamanhos" density="compact" hide-details  variant="outlined" label="Tamanho"></v-autocomplete>
            </v-col>
            <v-col>
                <v-autocomplete density="compact" :items=opcaoEscolhida.suprimentos hide-details variant="outlined"
                    label="Tecido"></v-autocomplete>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script lang="ts">
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto'
import { defineComponent, onMounted, ref } from 'vue'
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos'


export default defineComponent({
    name: 'FormEsquemaProduto',
    components: {

    },
    data() {
        return {
            escolhido: "",
            cores: ['Branco', 'Preto', 'Azul-Noite', 'Verde Militar'],
            tecidos: ['Gabardine', 'Tricoline'],
        }
    },
    watch: {
        async escolhido() {
            try {
                let id = this.escolhido.split("-")[0] as String
                await this.store.SetEscolhido(id)
                this.opcaoEscolhida = this.store.getEsquema
                console.log(this.store.esquema_escolhido.cor)
            } catch (error) {
                console.log(error)
            }
        }  
    },
    setup() {
    const opcoes = ref([] as String[])
    const opcaoEscolhida = ref({} as IEsquemaProduto)
    const store = useEsquemaProdutoStore()
    onMounted(async () => {
        try {
            await store.listOpcoes()
            opcoes.value = store.getOpcoes
            opcaoEscolhida.value = store.getEsquema
            console.log(opcoes.value)
        } catch (error) {
            console.log(error)
        }
    },)
    return {
        store,
        opcoes,
        opcaoEscolhida
    }
}
})
</script>
  