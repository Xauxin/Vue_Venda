<template>
    <v-form v-model="valid" validate-on="input" update:model-value>
        <v-container class="px-5 py-2" fluid height="50%">
            <v-row height="50%">
                <v-col class="py-1">
                    <v-autocomplete validate-on="input" :rules="rules" v-model="produtoEscolhido['nome']" density="compact" label="Produto"
                        variant="outlined" :items="opcoes" auto-select-first hide-details>
                    </v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete validate-on="input" :rules="rules" density="compact" v-model="produtoEscolhido['cor']" hide-details
                        label="Cor" :items=opcaoEscolhida.cor variant="outlined" auto-select-first>
                    </v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete validate-on="input" :rules="rules" :items="opcaoEscolhida.tamanhos" v-model="produtoEscolhido['tamanho']"
                        density="compact" hide-details variant="outlined" label="Tamanho"></v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete validate-on="input" :rules="rules" density="compact" :items=opcaoEscolhida.suprimentos
                        v-model="produtoEscolhido['Tecido']" hide-details variant="outlined"
                        label="Tecido"></v-autocomplete>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
  
<script lang="ts">
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto'
import { useProdutoParaVendaStore } from '@/store/ProdutoParaVenda'
import { defineComponent, onMounted, ref } from 'vue'
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos'
import { IProduto } from '@/interfaces/Produto'


export default defineComponent({
    name: 'FormEsquemaProduto',
    components: {

    },
    data() {
        return {
            valid: false as boolean,
            nomeEscolhido: "" as String,
            produtoEscolhido: {} as IProduto,
            cores: ['Branco', 'Preto', 'Azul-Noite', 'Verde Militar'],
            tecidos: ['Gabardine', 'Tricoline'],
            rules: [
                (value: String) => {
                    if (value) return true
                    return false
                },
            ]
        }
    },
    watch: {
        async 'produtoEscolhido.nome'() {
            try {
                let id = this.produtoEscolhido.nome.split(" - ") as String[]
                await this.store.SetEscolhido(id[0])
                this.opcaoEscolhida = this.store.getEsquema
            } catch (error) {
                console.log(error)
            }
        },
        produtoEscolhido: {
            handler() {
                if ( this.ProdutoParaVenda.getprodutoJaEscolhido ){
                    if (this.valid) {
                    this.ProdutoParaVenda.atualizaNomeCorTamanhoETecido(this.produtoEscolhido)
                }
            }},
            deep: true
        },
        valid(){
            if (!this.ProdutoParaVenda.getprodutoJaEscolhido && this.valid){
                this.ProdutoParaVenda.setNomeCorTamanhoETecido(this.produtoEscolhido)
            }
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
        ProdutoParaVenda.$reset
        return {
            store,
            opcoes,
            opcaoEscolhida,
            ProdutoParaVenda,
        }
    }
})
</script>
  