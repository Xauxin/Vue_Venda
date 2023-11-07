<template>
    <div>
        <TabelaMedidas
            :medidas-escolhidas="MedidasEscolhidas" 
            @apaga-medidas="apagaMedidas"
            @abreEFechaDialog="abreEFechaDialog">
        </TabelaMedidas>
        <!-- <DialogMedidas ref="dialog"></DialogMedidas> -->
    </div>
</template>

<script lang="ts">
interface IMedidasEscolhidas{
    [medida: string]: string
}


import { defineComponent } from 'vue'
import TabelaMedidas from './TabelaMedidas.vue'
// import DialogMedidas from './DialogMedidas.vue'

export default defineComponent({
    name: 'MedidasPrduto',
    components: {
        TabelaMedidas,
        // DialogMedidas
    },
    data() {
        return {
            dialog: false,
            medidas: ['Busto', 'Ombro', 'Costa', 'Frente', 'Decote', 'Alt.Seio', 'Comp', 'Cintura', 'Quadril', 'Manga Longa', 'Cava', 'Bordado', 'Trava', 'Botão'],
            Possiveis_Medidas: ['Biceps', 'Subir Curva do Busto', 'No meio das Costas', 'Da cava a Barra'],
            possiveisMedidasEscolhidas: [] as string[],
            MedidasEscolhidas: {} as IMedidasEscolhidas
        }
    },
    methods: {
        apagaMedidas() {
            this.MedidasEscolhidas = {}
        },
        abreEFechaDialog(){
            this.dialog = !this.dialog
        }

    },

})
</script>
