<!-- eslint-disable vue/no-useless-template-attributes -->
<template>
    <v-container class="pa-0 ma-0">
        <v-row align="center" no-gutters>
            <!-- Switch com Label Responsiva-->
            <v-col cols="2" class="mb-1">
                <v-switch color="primary" density="compact" v-model="comNome" hide-details>
                    <template v-slot:label="props">
                        <v-label v-bind="props" class="labelNome">{{ (!comNome as boolean) ? 'Nome' : undefined }}</v-label>
                    </template>
                </v-switch>
            </v-col>
            <!-- Switch com Label Responsiva-->
            <!-- TextField Do nome-->
            <v-col cols="8" v-if="comNome">
                <v-text-field solo :prepend-inner-icon="comPrefixo ? 'cancel' : ''" single-line variant="solo"
                    @click:prepend-inner="tiraPrefixo" :disabled="!comNome" rows="1"
                    v-model="(bordadoDoNome as IBordadoNome).nome"
                    class="text-center pa-0 ma-0 nomeBordado text-field-center" center-affix :style="estiloNome"
                    density="compact" clearable>
                    <!-- Parte debaixo do nome com especialidade-->
                    <template #loader class="pa-0 ma-0 text-center">
                        <p class="text-center" :style="fontFamilyAbaixoDoNome">
                            {{ (bordadoDoNome as IBordadoNome).abaixo_do_nome.text == 'Sem' ? '' : (bordadoDoNome as
                                IBordadoNome).abaixo_do_nome.text }}
                        </p>
                    </template>
                    <!-- Parte debaixo do nome com especialidade-->
                    <!-- Esquerda do textfield com Menus de prefixo e abaixo do nome-->
                    <template v-slot:prepend>
                        <v-container style="display: flex;flex-direction: column;" class="pa-0 ma-0">
                            <!-- Menu de prefixo-->
                            <v-menu v-model="menuPrefixo" :close-on-content-click="false" location="end">
                                <template v-slot:activator="{ props }">
                                    <v-btn :disabled="!comNome" v-bind="props" class="custom-btn-style" density="compact"
                                        size="xsmall" text="Pref">
                                    </v-btn>
                                </template>
                                <v-card max-width="150">
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="4" v-for="(item, index) in prefixos" :key="index">
                                                <v-btn class="custom-btn-style" density="compact"
                                                    @click.prevent="adicionaPrefixo($event.target)" size="xsmall"
                                                    :text="item"></v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                            <!-- Menu de prefixo-->
                            <!-- Menu de Abaixo do Nome -->
                            <v-menu v-model="menuAbaixo" :close-on-content-click="false" location="end">
                                <template v-slot:activator="{ props }">
                                    <v-btn :disabled="!comNome" v-bind="props" class="custom-btn-style mt-1"
                                        density="compact" size="xsmall" text="Pref" icon="arrow_drop_down">
                                    </v-btn>
                                </template>
                                <v-card min-width="150">
                                    <v-card-text class="ma-0 pa-1">
                                        <v-list class="ma-0 pa-0">
                                            <v-list-item class="ma-0 pa-0">
                                                <v-autocomplete :items="itemsAbaixoDoNome"
                                                    v-model="(bordadoDoNome as IBordadoNome).abaixo_do_nome.text"
                                                    density="compact" variant="outlined" :hide-no-data="false" hide-details>
                                                    <template #no-data>
                                                        <v-container>
                                                            <p>
                                                                Sem resultado
                                                            </p>
                                                            <v-btn>Criar</v-btn>
                                                        </v-container>
                                                    </template>
                                                </v-autocomplete>
                                            </v-list-item>
                                            <v-list-item class="ma-0 pa-0">
                                                <v-select
                                                    :disabled="(bordadoDoNome as IBordadoNome).abaixo_do_nome.text == 'Sem'"
                                                    class="mt-1" label="Fonte" :items="fontesAbaixoDoNome" density="compact"
                                                    v-model="(bordadoDoNome as IBordadoNome).abaixo_do_nome.font"
                                                    hide-details variant="outlined"></v-select>
                                            </v-list-item>
                                        </v-list>
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                            <!-- Menu de Abaixo do Nome -->
                        </v-container>
                    </template>
                    <!-- Esquerda do textfield com Menus de prefixo e abaixo do nome-->
                </v-text-field>
            </v-col>
            <!-- TextField Do nome-->
            <!-- Menu font e cor do Bordado do nome-->
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
                                    <v-select class="mt-2" label="Fonte" :items="fontes"
                                        v-model="(bordadoDoNome as IBordadoNome).fonte" hide-details density="compact"
                                        variant="outlined"></v-select>
                                </v-list-item>
                                <v-list-item>
                                    <v-text-field class="mt-2" variant="outlined" label="Cor"
                                        v-model="(bordadoDoNome as IBordadoNome).cor" hide-details density="compact">
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
import { useProdutoAbertoStore } from '@/store/ProdutoAberto';
import { useVendaAbertaStore } from '@/store/VendaAberta';
import { storeToRefs } from 'pinia';
import { computed, defineComponent, ref } from 'vue'

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
                fontFamily: (this.bordadoDoNome as IBordadoNome).fonte,
                color: (this.bordadoDoNome as IBordadoNome).cor,
                fontSize: this.fontSize
            };
            if ((this.bordadoDoNome as IBordadoNome).fonte == 'Montserrat') {
                estilo.fontWeight = 'Bold';
            } else {
                estilo.fontWeight = this.fontWeight;
            }
            return estilo as { [key: string]: string };
        },
        fontFamilyAbaixoDoNome(): { [key: string]: string } {
            return { fontFamily: (this.bordadoDoNome as IBordadoNome).abaixo_do_nome.font }
        }
    },
    data() {
        return {
            comNome: false as boolean,
            comPrefixo: false as boolean,
            indexPrefixo: 0 as number,
            fontWeight: "400" as string,
            fontSize: '40px' as string,
            menu: false as boolean,
            menuPrefixo: false as boolean,
            menuAbaixo: false as boolean,
            itemsAbaixoDoNome: ['Médica', 'Medicina', 'Sem'],
            fontesAbaixoDoNome: ['Block', 'MontSerrat'],
            procuraAbaixoDoNome: null,
            prefixos: [
                'Dr(a)',
                'Prof(a)',
                'Tec.',
                'Enf.',
            ]
        }
    },
    watch: {
        comNome() {
            if (this.comNome) {
                this.produtoAberto.setValoresPadroesParaNomeBordado(this.pessoaVenda.nome)
            } else {
                if (this.bordados) {
                    this.bordados.filter(bordado => bordado.local != 'nome')
                }
            }
        },

    },
    methods: {
        adicionaPrefixo(target: HTMLElement) {
            if (this.comPrefixo) {
                (this.bordadoDoNome as IBordadoNome).nome = (this.bordadoDoNome as IBordadoNome).nome.slice(this.indexPrefixo)
            }
            const prefixo = target.textContent
            this.indexPrefixo = prefixo ? prefixo.length : 0;
            (this.bordadoDoNome as IBordadoNome).nome = `${prefixo}${(this.bordadoDoNome as IBordadoNome).nome ? (this.bordadoDoNome as IBordadoNome).nome : ""}`
            this.comPrefixo = true
            this.menuPrefixo = false

        },
        tiraPrefixo() {
            (this.bordadoDoNome as IBordadoNome).nome = (this.bordadoDoNome as IBordadoNome).nome.slice(this.indexPrefixo)
            this.comPrefixo = false
        }
    },
    setup() {
        const vendaAberta = useVendaAbertaStore()
        const produtoAberto = useProdutoAbertoStore()
        const { bordados } = storeToRefs(produtoAberto)
        const { pessoaVenda } = storeToRefs(vendaAberta)
        const bordadoDoNome = computed((): IBordadoNome | any => {
            return bordados.value.find(bordado => bordado.local = 'nome')?.bordado 
        })
        const comNome = computed((): boolean => {
            if (bordadoDoNome.value) {
                return true
            } else {
                return false
            }
        })
        return {
            bordadoDoNome,
            pessoaVenda,
            produtoAberto,
            bordados
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


.custom-btn-style {
    font-family: 'Roboto', sans-serif;
    font-size: 8px;
    /* Tamanho de fonte menor para um botão pequeno */
    font-weight: 500;
    text-transform: none;
    white-space: nowrap;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    background-color: #1976d2;
    color: #ffffff;
    border-radius: 4px;
    padding: 3px 6px;
    /* Ajuste o padding conforme necessário para um botão pequeno */
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}

.custom-btn-style:hover {
    background-color: #1565c0;
}

.custom-btn-style:active {
    background-color: #0d47a1;
}

.text-field-center :deep(input) {
    text-align: center;
}</style>

