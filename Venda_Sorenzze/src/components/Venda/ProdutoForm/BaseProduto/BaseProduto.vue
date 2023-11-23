<template>
    <v-form>
        <v-container class="px-3 py-2" fluid height="50%">
            <v-row>
                <v-col class="py-1">
                    <v-autocomplete v-model="nome" density="compact" label="Produto" variant="outlined"
                        :items="opcoesDeEsquema" auto-select-first hide-details>
                    </v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete density="compact" v-model="cor" hide-details label="Cor"
                        :items=esquemaEscolhido.cor variant="outlined" auto-select-first>
                    </v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete :items="esquemaEscolhido.tamanhos" v-model="tamanho" density="compact"
                    hide-details variant="outlined" label="Tamanho"></v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete density="compact" :items=esquemaEscolhido.suprimentos v-model="tecido"
                    hide-details variant="outlined" label="Tecido"></v-autocomplete>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
  
<script lang="ts">
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto'
import { useProdutoAbertoStore } from '@/store/ProdutoAberto'
import { defineComponent, ref } from 'vue'
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos'



export default defineComponent({
    name: 'BaseProduto',
    props: {
        opcoesDeEsquema: {
            type: Array as () => String[],
            required: true,
        },
        esquemaEscolhido:{
            type: {} as () => IEsquemaProduto,
            required: true
        }
    },
    data() {
        return {
            nome : "" as string,
            cor : "" as string,
            tamanho : "" as string,
            tecido : "" as string,
            ultimaValidacaoBase: false as boolean,
            oldNome: "" as string,
            cores: ['Branco', 'Preto', 'Azul-Noite', 'Verde Militar'],
            tecidos: ['Gabardine', 'Tricoline'],
        }
    },
    computed: {

    },
    watch: {
        nome:{
            handler(){
                this.$emit('setNome', this.nome, 'nome')
                },
        }
    },
    methods: {
        primeiraLetraMaiuscula(palavra: string) {
            return palavra[0].toUpperCase() + palavra.substring(1);
        }
    },
    setup() {
        const opcaoEscolhida = ref({} as IEsquemaProduto)
        const store = useEsquemaProdutoStore()
        const ProdutoAberto = useProdutoAbertoStore()


        return {
            store,
            opcaoEscolhida,
            ProdutoAberto,
        }
    }
})
</script>
  