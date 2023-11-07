<template>
    <v-form validate-on="lazy" @submit.prevent="salvaProdutoASerSalvo">
        <v-container class="px-5 py-2" fluid height="50%">
            <v-row height="50%">
                <v-col class="py-1">
                    <v-autocomplete v-model="nomeEscolhido" density="compact" label="Produto" variant="outlined" :items="opcoes"
                        auto-select-first hide-details>
                    </v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete density="compact" v-model="corEscolhida" hide-details label="Cor" :items=opcaoEscolhida.cor variant="outlined"
                        auto-select-first>
                    </v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete :items="opcaoEscolhida.tamanhos" density="compact" hide-details  variant="outlined" label="Tamanho"></v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete density="compact" :items=opcaoEscolhida.suprimentos hide-details variant="outlined"
                        label="Tecido"></v-autocomplete>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
  
<script lang="ts">
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto'
import { useProdutoParaVendaStore } from '@/store/ProdutoParaVenda'
import { defineComponent, onMounted, ref  } from 'vue'
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos'
import { IProduto } from '@/interfaces/Produto'


export default defineComponent({
    name: 'FormEsquemaProduto',
    components: {

    },
    data() {
        return {
            nomeEscolhido: "",
            corEscolhida:"",
            tamanhoEscolhido:"",
            TecidoEscolhido:"",
            produtoEscolhido: {} as IProduto,
            cores: ['Branco', 'Preto', 'Azul-Noite', 'Verde Militar'],
            tecidos: ['Gabardine', 'Tricoline'],
        }
    },
    methods:{
        salvaProdutoASerSalvo(){
            console.log(this.nomeEscolhido)
        }
    },
    watch: {
        async nomeEscolhido() {
            try {
                let id = this.nomeEscolhido.split("-")[0] as String
                await this.store.SetEscolhido(id)
                this.opcaoEscolhida = this.store.getEsquema
            } catch (error) {
                console.log(error)
            }
        },
        produtoEscolhido: async function (newProduto: IProduto, oldProduto: IProduto) {
            console.log(newProduto, oldProduto)
        }  
    },
    setup() {
    const opcoes = ref([] as String[])
    const opcaoEscolhida = ref({} as IEsquemaProduto)
    const store = useEsquemaProdutoStore()
    const ProdutoParaVenda = useProdutoParaVendaStore()


    onMounted(async () => {
      try {
        await store.listOpcoes()
        opcoes.value = store.getOpcoes
        opcaoEscolhida.value = store.getEsquema
      } catch (error) {
        console.log(error)
      }
    })

    return {
      store,
      opcoes,
      opcaoEscolhida,
      ProdutoParaVenda,
    }
}
})
</script>
  