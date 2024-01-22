<template>
    <v-row>
        <v-col cols="4" v-for="(value, key) in locaisEscolhidos" :key="key">
            <v-card density="compact" height="100%" min-height="235" color="primary">
                <v-card-title class="pa-0 text-center text-caption text-capitalize">
                    <p>{{ value.local }}</p>
                </v-card-title>
                <v-card-subtitle class="text-center text-caption">{{ (value.bordado as IBordado).codigo ? (value.bordado as IBordado).codigo : "B1ABC00.ABC" }}</v-card-subtitle>
                <v-divider class="mx-2 my-1"></v-divider>
                <v-card-text class="pa-0">
                    <v-img v-bind:item="key" :src="(value.bordado as IBordado).Imagem"
                        min-height="100" height="100" aspect-ratio="1/1">
                    </v-img>
                    <v-divider class="mx-2 my-1"></v-divider>
                    <p height="24px" class="mt-1 text-center text-body-1">R${{ (value.bordado as IBordado).preco }}</p>
                </v-card-text>
                <v-divider class="mx-2"></v-divider>
                <v-card-actions align-self="bo">
                    <v-row>
                        <v-col cols="4">
                            <v-btn variant="flat" icon="add"
                                @click.prevent="$emit('abreDialog', key)" rounded density="compact"
                                color="secondary" bg-color="info"></v-btn>
                        </v-col>
                        <v-col cols="4" offset="4">
                            <v-btn variant="flat" density="compact" rounded icon="delete" color="secondary"
                                bg-color="danger"></v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="4" v-if="locaisRestantes.length">
            <v-card color="primary" justify="center" density="compact" height="100%" min-height="235"
                @click="escolhendoCard = !escolhendoCard">
                <v-card-text class="text-center fill-height">
                    <v-row height="100%">
                        <v-col cols="12" justify-self="center">
                            <v-icon v-if='!escolhendoCard' size="x-large">add</v-icon>
                            <v-menu v-else :close-on-content-click="false" aling="center" location="center"
                                min-width="200px" v-model="menuLocais">
                                <template v-slot:activator="{ props }">
                                    <v-btn color="secondary" v-bind="props" justify-self='center'>
                                        Local
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item ref="listaLocais" v-for="(item, index) in locaisRestantes" :key="index"
                                        :value="index">
                                        <v-list-item-title @click="adicionaBordado(item as string)" v-if="item != 'outro'"
                                            class=" text-capitalize">{{ (item as
                                                string).replace("_", " ") }}
                                        </v-list-item-title>
                                        <v-text-field v-model="local" variant="outlined" label="Outro" v-else
                                            density="compact" hide-details>
                                            <template #append>
                                                <v-icon @click="adicionaBordado(item as string)">check</v-icon>
                                            </template>
                                        </v-text-field>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { useEsquemaProdutoStore } from '@/store/EsquemaProduto'
import { useProdutoAbertoStore } from '@/store/ProdutoAberto'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { IBordado, IBordadoNome, IBordados, ILocalBordado } from '@/interfaces/Bordado'
import { computed } from 'vue'

export default defineComponent({
    name: 'BordadoCards',
    emits: ['abreDialog', 'atualizaLocaisEscolhidos'],
    props: {
        bordadosEscolhidos: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            menuLocais: false,
            escolhendoCard: false,
            local: "" as string
        }
    },
    methods: {
        abreDialog(item: String) {
            this.$emit('abreDialog', item)
        },
        adicionaBordado(item: string) {
            const id = Math.random()
            this.bordados[`${id}`] = {'local' : item} as ILocalBordado
        }
    },
    setup() {
        const produtoAberto = useProdutoAbertoStore()
        const esquemaProduto = useEsquemaProdutoStore()
        const { bordados } = storeToRefs(produtoAberto)
        const { esquema_escolhido } = storeToRefs(esquemaProduto)
        let locaisEscolhidos = computed(() => {
            let hold = {} as IBordados
            Object.entries(bordados.value).forEach((bordado: [string, ILocalBordado | IBordadoNome]) => {
                const [key, value] = bordado
                if (value.local) {
                    hold[key] = value
                }
            });
            return hold
        })
        let locaisRestantes = computed(() => {
            let hold = esquema_escolhido.value.locais_de_bordado.filter(local =>{ Object.(locaisEscolhidos.value)})
            return hold
        })
        return {
            locaisRestantes,
            locaisEscolhidos,
            esquema_escolhido,
            produtoAberto,
            bordados
        }
    }
})
</script>




