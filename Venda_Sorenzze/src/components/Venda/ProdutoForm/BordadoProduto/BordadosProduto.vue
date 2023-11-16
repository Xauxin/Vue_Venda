<template>
    <div>
        <v-card height="100%" min-height="300" :elevation="3" border rounded class="py-2 px-4">
            <BordadoNome :cores="['Preto', 'Dourado', 'Grafite']"
                :fontes="['MontSerrat', 'Block', 'Monotype']"/>
            <v-divider class="mb-1 border-opacity-75"></v-divider>
            <BordadoCards :bordados-escolhidos="bordadosEscolhidos"
                :locais="produtoEscolhido ? locaisPossiveis((produtoEscolhido.locais_de_bordado as String[]), (locaisEscolhidos as String[])) : []"
                @atualiza-locais-escolhidos="atualizaLocaisEscolhidos" @abre-dialog="AbreDialogEMudaBordadoAscessado" />
        </v-card>
        <DialogEsolheBordado ref="dialog" :bordado-ascessado="(BordadoAscessado as string)"
            @adiciona-bordado="adicionaBordado" />
    </div>
</template>

<script lang="ts">

import { IBordado, IBordados } from '@/interfaces/Bordado'
import { defineComponent, ref, watch } from 'vue'
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos'
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto'
import BordadoNome from './BordadoNome.vue'
import BordadoCards from './BordadoCard.vue'
import DialogEsolheBordado from './DialogEsolheBordado.vue'



export default defineComponent({
    name: 'BordadosProduto',
    components: {
        BordadoNome,
        BordadoCards,
        DialogEsolheBordado
    },
    data() {
        return {
            BordadoPreSelecionado: {} as IBordado,
            BordadoAscessado: "" as String,
            bordadosEscolhidos: {
            } as IBordados,
            oldbordadosEscolhidos: {
            } as IBordados,
            locaisEscolhidos: [] as String[]
        }
    },
    watch:{
        bordadosEscolhidos:{
            handler(){
                if(this.oldbordadosEscolhidos != this.bordadosEscolhidos){
                    console.log(this.bordadosEscolhidos)
                }
            },
            deep:true
        }
    },
    methods: {
        locaisPossiveis(todosLocais: String[], locaisEscolhidos: String[]) {
            if (todosLocais) {
                const possiveisLocais = todosLocais.filter(local => !locaisEscolhidos.includes(local)) as String[]
                return possiveisLocais
            }
            return []
        },
        AbreDialogEMudaBordadoAscessado(key: string) {
            this.BordadoAscessado = key
            console.log(key);
            (this.$refs.dialog as typeof DialogEsolheBordado).abrirDialog()
        },
        atualizaLocaisEscolhidos(localEscolhido: String) {
            this.locaisEscolhidos.push(localEscolhido)
        },
        adicionaBordado(bordado: IBordado) {
            this.bordadosEscolhidos[(this.BordadoAscessado as string)] = bordado;
            (this.$refs.dialog as typeof DialogEsolheBordado).fechaDialog()
        }
    },
    setup() {
        const storeEsquema = useEsquemaProdutoStore()
        let produtoEscolhido = ref({} as IEsquemaProduto)
        watch(
            () => storeEsquema.getEsquema,
            () => {
                produtoEscolhido.value = storeEsquema.getEsquema
            }
        )
        return {
            produtoEscolhido: produtoEscolhido,

        }
    }
})
</script>




