<template>
    <div>
        <v-card height="100%" min-height="300" :elevation="3" border rounded class="py-2 px-4">
            <BordadoNome :cores="['Preto', 'Dourado', 'Grafite']" :fontes="['MontSerrat', 'Block', 'Monotype']" />
            <v-divider class="mb-1 border-opacity-75"></v-divider>
            <BordadoCards @abre-dialog="AbreDialogEMudaBordadoAscessado" />
        </v-card>
        <DialogEsolheBordado ref="dialog" :BordadoAscessado="(bordadoAscessado as number)"/>
    </div>
</template>

<script lang="ts">

import { IBordado } from '@/interfaces/Bordado'
import { defineComponent } from 'vue'
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
    props: {
        esquemaEscolhido: {
            type: Object as () => IEsquemaProduto | null,
            required: true
        }
    },
    data() {
        return {
            BordadoPreSelecionado: {} as IBordado,
            bordadoAscessado: 0 as Number,
            contextoParaOutroBordado: "" as string,
        }
    },
    methods: {
        AbreDialogEMudaBordadoAscessado(key: Number) {
            this.bordadoAscessado = key;
            (this.$refs.dialog as typeof DialogEsolheBordado).abrirDialog();
        },

    }

})
</script>




