<template>
    <v-container class="pa-0 ma-0">
        <v-row align="center" no-gutters>
            <v-col cols="2" class="mb-1">
                <v-switch color="primary" density="compact" v-model="comNome" hide-details>
                    <template v-slot:label="props">
                        <v-label v-bind="props" class="labelNome">{{ (!comNome as boolean) ? 'Nome' : undefined }}</v-label>
                    </template>
                </v-switch>
            </v-col>
            <v-col cols="8" v-if="comNome">
                <v-text-field single-line variant="solo" :disabled="!comNome" rows="1" hide-details v-model="nomeEscolhido"
                    class="text-center pa-0 ma-0 nomeBordado" :style="{ ...estiloNome, fontSize: '40px' }" density="compact"
                    clearable>
                    <template v-slot:prepend-inner="props">
                        <v-icon v-bind="props" @click="comDr = !comDr" :color="estiloDr">
                            <p class="Dra">Dr(a).</p>
                        </v-icon>
                    </template>

                </v-text-field>
            </v-col>
            <v-col cols="2" v-if="comNome">
                <div class="text-center">
                    <v-menu v-model="menu" :close-on-content-click="false" location="end">
                        <template v-slot:activator="{ props }">
                            <v-btn :disabled="!comNome" v-bind="props" density="compact">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </template>
                        <v-card min-width="150">
                            <v-list>
                                <v-list-item>
                                    <v-select class="mt-2" label="Fonte" :items="fontes" v-model="objetoNome.fonte" hide-details
                                        density="compact" variant="outlined"></v-select>
                                </v-list-item>
                                <v-list-item>
                                    <v-text-field class="mt-2" variant="outlined" label="Cor" v-model="objetoNome.cor" hide-details
                                        density="compact">
                                    </v-text-field>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { IBordadoNome } from '@/interfaces/Bordado';
import { useVendaAbertaStore } from '@/store/VendaAberta';
import { defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
    name: 'BordadoNome',
    props: {
        cores: {
            type: Array,
            required: true
        },
        fontes: {
            type: Array,
            required: true
        }
    },
    computed: {
        estiloNome(): { [key: string]: string } {
            const estilo: { [key: string]: string } = {
                fontFamily: this.objetoNome.fonte,
                color: this.objetoNome.cor,
                fontSize: this.fontSize
            };
            if (this.objetoNome.fonte == 'Montserrat') {
                estilo.fontWeight = 'bold';
            } else {
                estilo.fontWeight = this.fontWeight;
            }
            return estilo as { [key: string]: string };
        },
    },
    data() {
        return {
            objetoNome: {
                nome: this.nomeEscolhido,
                fonte: '' as string,
                cor: '' as string
            } as unknown as IBordadoNome,
            comNome: false as boolean,
            comDr: false as boolean,
            estiloDr: "Grey" as string,
            fontWeight: "400" as string,
            fontSize: '40px' as string,
            menu: false as boolean,
        }
    },
    watch: {
        comDr() {
            if (this.comDr) {
                this.estiloDr = '#000000'
                console.log(this.nomeEscolhido)
            } else {
                this.estiloDr = "#EEEEEE"

            }
        },
        comNome() {
            if (this.comNome) {
                this.$emit(
                    'setNomeBordado',
                    {

                    }
                )
            }
        }
    },
    setup() {
        const VendaAbertastore = useVendaAbertaStore()
        const NomepessoaVenda = ref("" as String)
        const nomeEscolhido = ref("" as String)
        onMounted(() => {
            NomepessoaVenda.value = VendaAbertastore.getpessoaVenda.nome
            nomeEscolhido.value = NomepessoaVenda.value
        })
        watch(
            () => VendaAbertastore.getpessoaVenda,
            () => {
                NomepessoaVenda.value = VendaAbertastore.getpessoaVenda.nome
                nomeEscolhido.value = NomepessoaVenda.value
            }
        )
        return {
            NomepessoaVenda,
            nomeEscolhido
        }
    }
})
</script>

<style lang="scss" scoped>
@use '@/styles/main';
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Montserrat&display=swap');

@font-face {
    font-family: 'Monotype';
    src: url('../../../../assets/fonts/monotype-corsiva/Monotype\ Corsiva.ttf') format('truetype');
}

.labelNome {
    word-break: keep-all;
}

.Dra {
    font-size: 14px;
    font-weight: bold;
    font-style: none;
}
</style>

