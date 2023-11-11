<template>
    <v-form v-model="valid" validate-on="input">
        <v-container class="px-5 py-2" fluid height="50%">
            <v-row height="50%">
                <v-col class="py-1">
                    <v-autocomplete validate-on="input" :rules="rules" v-model="baseEscolhida['nome']" density="compact" label="Produto"
                        variant="outlined" :items="opcoes" auto-select-first hide-details>
                    </v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete validate-on="input" :rules="rules" density="compact" v-model="baseEscolhida['cor']" hide-details
                        label="Cor" :items=opcaoEscolhida.cor variant="outlined" auto-select-first>
                    </v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete validate-on="input" :rules="rules" :items="opcaoEscolhida.tamanhos" v-model="baseEscolhida['tamanho']"
                        density="compact" hide-details variant="outlined" label="Tamanho"></v-autocomplete>
                </v-col>
                <v-col class="py-1">
                    <v-autocomplete validate-on="input" :rules="rules" density="compact" :items=opcaoEscolhida.suprimentos
                        v-model="baseEscolhida['Tecido']" hide-details variant="outlined"
                        label="Tecido"></v-autocomplete>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
  
<script lang="ts">
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto'
import { useProdutoAbertoStore } from '@/store/ProdutoAberto'
import { defineComponent, onMounted, ref } from 'vue'
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos'
import {  IBaseProduto } from '@/interfaces/Produto'


export default defineComponent({
    name: 'FormEsquemaProduto',
    components: {

    },
    data() {
        return {
            valid: false as boolean,
            baseEscolhida: {} as IBaseProduto,
            oldbaseEscolhida: {} as IBaseProduto,
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
        async 'baseEscolhida.nome'() {
            try {
                let id = this.baseEscolhida.nome.split(" - ") as String[]
                console.log(id)
                await this.store.SetEscolhido(id[0])
                this.opcaoEscolhida = this.store.getEsquema
                this.ProdutoAberto.setNomeProdutoFoiEscolhido(true)
            } catch (error) {
                console.log(error)
                this.ProdutoAberto.setNomeProdutoFoiEscolhido(false)
            }
        },
        baseEscolhida: {
            handler: function () {    
                if(this.baseEscolhida != this.oldbaseEscolhida){
                    this.oldbaseEscolhida = { ...this.baseEscolhida}
                    if ( this.ProdutoAberto.getbaseFoiEscolhida ){
                        if (this.valid) {
                        this.ProdutoAberto.atualizaNomeCorTamanhoETecido(this.baseEscolhida)
                    }
                }
            }},
            deep:true
        },
        valid(){
            if (!this.ProdutoAberto.getbaseFoiEscolhida && this.valid){
                this.ProdutoAberto.setNomeCorTamanhoETecido(this.baseEscolhida)
            }
        }
    },
    setup() {
        const opcoes = ref([] as String[])
        const opcaoEscolhida = ref({} as IEsquemaProduto)
        const store = useEsquemaProdutoStore()
        const ProdutoAberto = useProdutoAbertoStore()

        onMounted(async () => {
            try {
                await store.listOpcoes()
                opcoes.value = [] as String[]
                opcoes.value = store.getOpcoesDeEsquema
                opcaoEscolhida.value = {} as IEsquemaProduto
                opcaoEscolhida.value = store.getEsquema
            } catch (error) {
                console.log(error)
            }
        })
        return {
            store,
            opcoes,
            opcaoEscolhida,
            ProdutoAberto,
        }
    }
})
</script>
  