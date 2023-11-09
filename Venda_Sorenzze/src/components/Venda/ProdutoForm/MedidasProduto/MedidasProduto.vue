<template>
    <div>
        <TabelaMedidas
            @abreEFechaDialog="abreEFechaDialog">
        </TabelaMedidas>
        <DialogMedidas ref="dialog"></DialogMedidas>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import TabelaMedidas from './TabelaMedidas.vue'
import DialogMedidas from './DialogMedidas.vue'

export default defineComponent({
    name: 'MedidasPrduto',
    components: {
        TabelaMedidas,
        DialogMedidas
    },
    data() {
        return {
            dialog: false,
    
        }
    },
    methods: {
        abreEFechaDialog(){
            (this.$refs.dialog as typeof DialogMedidas).abreEFechaDialog()
        }

    },

})
</script>
