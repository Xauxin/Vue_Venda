<template>
    <v-form>
        <v-container class="px-3 py-2" fluid height="50%">
            <v-row height="50%">
                <v-col class="py-1">
                    <v-autocomplete v-model="baseEscolhida.nome" density="compact" label="Produto" variant="outlined"
                        :items="opcoesDeEsquema" auto-select-first hide-details>
                    </v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete density="compact" v-model="baseEscolhida['cor']" hide-details label="Cor"
                        :items=opcaoEscolhida.cor variant="outlined" auto-select-first>
                    </v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete :items="opcaoEscolhida.tamanhos" v-model="baseEscolhida.tamanho" density="compact"
                        hide-details variant="outlined" label="Tamanho"></v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete density="compact" :items=opcaoEscolhida.suprimentos v-model="baseEscolhida.Tecido"
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
import { IBaseProduto } from '@/interfaces/Produto'


export default defineComponent({
    name: 'FormEsquemaProduto',
    props: {
        opcoesDeEsquema: {
            type: Array as () => String[],
            required: true,
        }

    },
    data() {
        return {
            baseEscolhida: {
                nome: "" as String,
                cor: "" as String,
                tamanho: "" as string,
                Tecido: "" as string
            } as unknown as IBaseProduto,
            oldbaseEscolhida: {
                nome: "" as String,
                cor: "" as String,
                tamanho: "" as string,
                Tecido: "" as string
            } as unknown as IBaseProduto,
            ultimaValidacaoBase: false as boolean,
            oldNome: "" as string,
            cores: ['Branco', 'Preto', 'Azul-Noite', 'Verde Militar'],
            tecidos: ['Gabardine', 'Tricoline'],

        }
    },
    watch: {
        baseEscolhida: {
            handler: async function () {
                if (this.baseEscolhida.nome != this.oldNome) {
                    this.oldNome = this.baseEscolhida.nome.slice();
                    try {
                        let id = this.baseEscolhida.nome.split(" - ") as String[]
                        await this.store.SetEscolhido(id[0])
                        this.opcaoEscolhida = this.store.getEsquema
                        this.ProdutoAberto.setNomeProdutoFoiEscolhido(true)
                    } catch (error) {
                        console.log(error)
                        this.ProdutoAberto.setNomeProdutoFoiEscolhido(false)
                    }
                }
                if (Object.entries(this.baseEscolhida).every(dado => { if (dado[1]) return true })) {
                    if (!this.ultimaValidacaoBase) {
                        this.ultimaValidacaoBase = true
                        this.ProdutoAberto.setNomeCorTamanhoETecido(this.baseEscolhida)
                    } else {
                        this.ProdutoAberto.atualizaNomeCorTamanhoETecido(this.baseEscolhida)
                    }
                } else {
                    this.ProdutoAberto.unsetbaseFoiEscolhida()
                    this.ultimaValidacaoBase = false
                }
            },
            deep: true
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
  