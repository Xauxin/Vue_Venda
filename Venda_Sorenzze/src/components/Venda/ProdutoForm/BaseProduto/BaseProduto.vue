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
                        :items="esquemaEscolhido.cor" variant="outlined" auto-select-first>
                    </v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete :items="esquemaEscolhido.tamanhos" v-model="tamanho" density="compact"
                    hide-details variant="outlined" label="Tamanho"></v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete density="compact" :items="esquemaEscolhido.suprimentos" v-model="tecido"
                    hide-details variant="outlined" label="Tecido"></v-autocomplete>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos'
import { useProdutoAbertoStore } from '@/store/ProdutoAberto'
import { Store, StoreState, storeToRefs } from 'pinia'
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto'



export default defineComponent({
    name: 'BaseProduto',
    props: {
        opcoesDeEsquema: {
            type: Array as () => String[],
            required: true,
        },
        esquemaEscolhido:{
            type: Object as () => IEsquemaProduto,
            required: true
        }
    },
    data() {
        return {
            cores: ['Branco', 'Preto', 'Azul-Noite', 'Verde Militar'],
            tecidos: ['Gabardine', 'Tricoline'],
        }
    },
    setup(){
        const produtoAberto = useProdutoAbertoStore() as any
        const {nome, cor, tamanho, tecido } = storeToRefs(produtoAberto)
        return{
            produtoAberto,
            nome,
            cor,
            tamanho,
            tecido
        }
    }
    
})
</script>
  