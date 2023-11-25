<template>
    <div>
        <v-card height="100%" min-height="300" :elevation="3" border rounded class="py-2 px-4">
            <BordadoNome 
                :cores="['Preto', 'Dourado', 'Grafite']"
                :fontes="['MontSerrat', 'Block', 'Monotype']"
                @set-nome-bordado="setNome"/>
            <v-divider class="mb-1 border-opacity-75"></v-divider>
            <BordadoCards :bordados-escolhidos="bordadosEscolhidos"
                :locais="esquemaEscolhido ? locaisPossiveis((esquemaEscolhido.locais_de_bordado as String[]), (locaisEscolhidos as String[])) : []"
                @atualiza-locais-escolhidos="atualizaLocaisEscolhidos" @abre-dialog="AbreDialogEMudaBordadoAscessado" />
        </v-card>
        <DialogEsolheBordado ref="dialog" :bordado-ascessado="(BordadoAscessado as string)"
            @adiciona-bordado="adicionaBordado" />
    </div>
</template>

<script lang="ts">

import { IBordado, IBordadoNome, IBordados } from '@/interfaces/Bordado'
import { defineComponent} from 'vue'
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos'
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
    props:{
        esquemaEscolhido:{
            type: Object as ()=> IEsquemaProduto | null,
            required: true
        }
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
                    this.$emit('setBordados', this.bordadosEscolhidos, 'bordados')
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
        },
        setNome(nome:IBordadoNome){
            this.bordadosEscolhidos.nome = nome
        }
    }
   
})
</script>




