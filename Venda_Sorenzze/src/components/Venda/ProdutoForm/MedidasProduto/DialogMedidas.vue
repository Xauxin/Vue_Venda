<template>
    <v-dialog v-model="dialog" location="center" no-click-animation close-on-back close-delay="0" open-delay="0" contained>
            <v-row justify="center">
                <v-sheet width="40%" class="pa-2"  @click="console.log(MedidasEscolhidas)">
                    <v-row>
                        <v-col cols="10">
                            <p class="text-h4">Medidas</p>
                        </v-col>
                        <v-col cols="2">
                            <VRow no-gutters>
                                <v-col cols="6" align="end">
                                    <v-btn size="x-small" icon="delete" @click="apagaMedidas()"></v-btn>
                                </v-col>
                                <v-col cols="6" align="end">
                                    <v-btn size="x-small" icon="close" @click="dialog = !dialog"></v-btn>
                                </v-col>
                            </VRow>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row no-gutters>
                        <v-col cols="7" class="px-4 py-4">
                            <v-row>
                                <v-col dense cols="6" v-for="medida, index in produtoEscolhido.medidas" :key="index" class="pa-1">
                                    <v-text-field 
                                        v-model="MedidasEscolhidas[(medida as string)]" 
                                        density="compact" 
                                        :label=medida.toString()
                                        hide-details
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col class="px-1 py-4" cols="5">
                            <v-row>
                                <v-col cols="12">
                                    <v-autocomplete v-model="possiveisMedidasEscolhidas" :items="produtoEscolhido.mais_medidas" chips
                                        closable-chips label="Mais Medidas" multiple>
                                        <template v-slot:chip="{ props }">
                                            <v-chip v-bind="props"></v-chip>
                                        </template>
                                        <template v-slot:item="{ props }">
                                            <v-list-item v-bind="props"></v-list-item>
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-btn @click.prevent="SalvarMedidas()"></v-btn>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-row>
        </v-dialog>
</template>

<script lang="ts">
import { IEsquemaProduto } from '@/interfaces/EsquemaProdutos'
import { IMedidas } from '@/interfaces/Produto'
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto'
import { useProdutoParaVendaStore } from '@/store/ProdutoParaVenda'
import { defineComponent, ref, watch } from 'vue'




export default defineComponent({
    name: 'DialogMedidas',
    data() {
        return {
            dialog: false,
            possiveisMedidasEscolhidas: [] as string[],
            MedidasEscolhidas: {} as IMedidas
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
        },
        SalvarMedidas(){
            this.ProdutoParaVenda.setProduto(this.MedidasEscolhidas)
        }
    },
    setup() {
        const storeEsquema = useEsquemaProdutoStore()
        let produtoEscolhido = ref({} as IEsquemaProduto)
        const ProdutoParaVenda = useProdutoParaVendaStore()
    watch(
        () => storeEsquema.getEsquema,
        () => {
            produtoEscolhido.value = storeEsquema.getEsquema
        }
    )
        return {
            produtoEscolhido: produtoEscolhido,
            ProdutoParaVenda: ProdutoParaVenda
        }
    }
    
})
</script>
