<template>
    <v-sheet :elevation="3" border rounded height="100%" class="px-2 py-2">
        <v-row class="pa-2">
            <v-col cols="6">
                <p class="text-h6">Medidas</p>
            </v-col>
            <v-col cols="6">
                <VRow no-gutters>
                    <v-col cols="6" align="end">
                        <v-btn size="x-small" icon="edit" @click="abreEFechaDialog"></v-btn>
                    </v-col>
                    <v-col cols="6" align="end">
                        <v-btn size="x-small" icon="delete" @click="apagaMedidas()"></v-btn>
                    </v-col>
                </VRow>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="pa-3">
            <v-col cols="6" v-for="(item, key) in MedidasEscolhidas" v-bind:key="key">
                <v-row class="pa-0 overflow-hidden">
                    <v-col class="pa-0 pl-1" cols="8">
                        <p class="text-body-2 text-no-wrap  overflow-hidden">{{ key }}</p>
                    </v-col>
                    <v-col class="pa-0 pr-1" cols="4">
                        <p class="text-body-2 text-right">{{ item }}</p>
                    </v-col>
                    <v-divider class="border-opacity-100" vertical></v-divider>
                    <v-divider class="border-opacity-100"></v-divider>
                </v-row>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script lang="ts">
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos'
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto'
import { defineComponent, ref, watch } from 'vue'

interface IMedidasEscolhidas{
    [medida: string]: string
}


export default defineComponent({
    name: 'DialogMedidas',
    data() {
        return {
            medidaEscolhidas: {} as IMedidasEscolhidas,
            dialog: false,
            possiveisMedidasEscolhidas: [] as string[],
            MedidasEscolhidas: {} as IMedidasEscolhidas
        }
    },
    watch: {
        possiveisMedidasEscolhidas: function (newArray: string[], oldArray: string[]) {
            console.log(newArray, oldArray)
            if (newArray.length > oldArray.length) {
                this.produtoEscolhido.medidas.push(newArray[newArray.length - 1] as string)
                console.log(newArray)
            } else {
                let elementoTirado = oldArray.filter((medida) => !newArray.includes(medida))
                let index = this.produtoEscolhido.medidas.indexOf(elementoTirado[0])
                this.produtoEscolhido.medidas.splice(index, 1)
                delete this.MedidasEscolhidas[(elementoTirado[0] as string)]
            }
        }
    },
    methods: {
        apagaMedidas() {
            this.$emit('apagaMedidas')
        },
        abreEFechaDialog(){
            this.dialog = !this.dialog
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
