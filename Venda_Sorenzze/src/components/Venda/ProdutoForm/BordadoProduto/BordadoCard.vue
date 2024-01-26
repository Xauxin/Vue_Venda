<template>
    <v-row>
        <v-col cols="4" v-for="(value, index) in getBordadosSemONome" :key="index">
            <v-card density="compact" height="100%" min-height="235" color="primary">
                <v-card-title class="pa-0 text-center text-caption text-capitalize">
                    <p>{{ value.local }}</p>
                </v-card-title>
                <v-card-subtitle class="text-center text-caption">{{ (value.bordado as IBordado).codigo ? (value.bordado as
                    IBordado).codigo :
                    "B1ABC00.ABC" }}</v-card-subtitle>
                <v-divider class="mx-2 my-1"></v-divider>
                <v-card-text class="pa-0">
                    <v-img v-bind:item="index" 
                        :src="(value.bordado as IBordado).Imagem ? (value.bordado as IBordado).Imagem : ''" min-height="100"
                        height="100" aspect-ratio="1/1">
                    </v-img>
                    <v-divider class="mx-2 my-1"></v-divider>
                    <p height="24px" class="mt-1 text-center text-body-1">R${{ (value.bordado as
                        IBordado).preco ? (value.bordado as
                            IBordado).preco : "" }}</p>
                </v-card-text>
                <v-divider class="mx-2"></v-divider>
                <v-card-actions align-self="bo">
                    <v-row>
                        <v-col cols="4">    
                            <v-btn variant="flat" icon="add" @click.prevent="$emit('abreDialog', value.local)" rounded
                                density="compact" color="secondary" bg-color="info"></v-btn>
                        </v-col>
                        <v-col cols="4" offset="4">
                            <v-btn variant="flat" density="compact" @click.prevent="excluirBordado(value)" rounded
                                icon="delete" color="secondary" bg-color="danger"></v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="4" v-if="!(getBordadosSemONome.length >= 3)">
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
                                                <v-icon @click="adicionaBordado(local as string)">check</v-icon>
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IBordado,  ILocalBordado } from '@/interfaces/Bordado'
import { computed } from 'vue'

export default defineComponent({
    name: 'BordadoCards',
    emits: ['abreDialog', 'atualizaLocaisEscolhidos'],
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
            this.bordados.push({ 'local': item, 'bordado': {} } as ILocalBordado) 
            this.menuLocais = false
        },
        excluirBordado(bordadoASerExlcuido:ILocalBordado) {
            this.bordados.filter(bordado => bordado.local != bordadoASerExlcuido.local)
        }
    },
    setup() {
        const produtoAberto = useProdutoAbertoStore()
        const esquemaProduto = useEsquemaProdutoStore()
        const { getBordadosSemONome, bordados } = storeToRefs(produtoAberto)
        const { esquema_escolhido } = storeToRefs(esquemaProduto)
        let locaisRestantes = computed(() => {
            const locaisEscolhidos = getBordadosSemONome.value.map(bordado =>{
                return bordado.local
            })
            return esquema_escolhido.value.locais_de_bordado.filter(local => !locaisEscolhidos.includes(local as string)) as string[]
        });

        return {
            bordados,
            locaisRestantes,
            getBordadosSemONome,
            esquema_escolhido,
            produtoAberto,
        }
    }
})
</script>




