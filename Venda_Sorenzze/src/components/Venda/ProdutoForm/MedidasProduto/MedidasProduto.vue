<template>
    <div>
        <TabelaMedidas @abreEFechaDialog="abreEFechaDialog">
        </TabelaMedidas>
        <DialogMedidas ref="dialog" 
        :esquemaMedidasEscolhidas="esquemaMedidasEscolhidas"
        :esquemaMaisMedidasEscolhidas="esquemaMaisMedidasEscolhidas"></DialogMedidas>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import TabelaMedidas from './TabelaMedidas.vue'
import DialogMedidas from './DialogMedidas.vue'
import { IEsquemaMedidas } from '@/interfaces/EsquemaProdutos'

export default defineComponent({
    name: 'MedidasPrduto',
    components: {
        TabelaMedidas,
        DialogMedidas
    },
    props: {
        esquemaMedidasEscolhidas: {
            type: Object as () => IEsquemaMedidas,
            required: true
        },
        esquemaMaisMedidasEscolhidas: {
            type: Object as () => IEsquemaMedidas,
            required: true
        }
    },
    data() {
        return {
            dialog: false,

        }
    },
    methods: {
        abreEFechaDialog() {
            (this.$refs.dialog as typeof DialogMedidas).abreEFechaDialog()
        }

    },

})
</script>
