<!-- eslint-disable vue/no-useless-template-attributes -->
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
                <v-text-field solo :prepend-inner-icon="comPrefixo ? 'cancel' : ''" single-line variant="solo"
                    @click:prepend-inner="tiraPrefixo" :disabled="!comNome" rows="1" v-model="objetoNome.nome"
                    class="text-center pa-0 ma-0 nomeBordado text-field-center" center-affix :style="estiloNome" density="compact"
                    clearable>
                    <template #loader class="pa-0 ma-0 text-center" >
                        <p class="text-center" :style="fontFamilyAbaixoDoNome">
                            {{ objetoNome.abaixo_do_nome.text == 'Sem'  ? '' : objetoNome.abaixo_do_nome.text }}
                        </p>
                    </template>

                    <template v-slot:prepend>
                        <v-container style="display: flex;flex-direction: column;" class="pa-0 ma-0">
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
                            <!-- Abaixo -->
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
                                                    v-model="objetoNome.abaixo_do_nome.text" density="compact"
                                                    variant="outlined" :hide-no-data="false" hide-details>
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
                                                <v-select :disabled="objetoNome.abaixo_do_nome.text == 'Sem'" class="mt-1" label="Fonte" :items="fontesAbaixoDoNome" density="compact"
                                                    v-model="objetoNome.abaixo_do_nome.font" hide-details
                                                    variant="outlined"></v-select>
                                            </v-list-item>
                                        </v-list>
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                        </v-container>
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
                                    <v-select class="mt-2" label="Fonte" :items="fontes" v-model="objetoNome.fonte"
                                        hide-details density="compact" variant="outlined"></v-select>
                                </v-list-item>
                                <v-list-item>
                                    <v-text-field class="mt-2" variant="outlined" label="Cor" v-model="objetoNome.cor"
                                        hide-details density="compact">
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
import { IAbaixoDoNome, IBordadoNome } from '@/interfaces/Bordado';
import { useVendaAbertaStore } from '@/store/VendaAberta';
import { defineComponent,  ref } from 'vue'

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
            const estilo : { [key: string]: string } = {
                fontFamily: this.objetoNome.fonte,
                color: this.objetoNome.cor,
                fontSize: this.fontSize
            };
            if (this.objetoNome.fonte == 'Montserrat') {
                estilo.fontWeight = 'Bold';
            } else {
                estilo.fontWeight = this.fontWeight;
            }
            return estilo as { [key: string]: string };
        },
        fontFamilyAbaixoDoNome():{ [key: string]: string }{
            return {fontFamily : this.objetoNome.abaixo_do_nome.font}
        }
    },
    data() {
        return {
            comNome: false as boolean,
            comPrefixo: false as boolean,
            indexPrefixo: 0 as number,
            estiloDr: "Grey" as string,
            fontWeight: "400" as string,
            fontSize: '40px' as string,
            menu: false as boolean,
            menuPrefixo: false as boolean,
            menuAbaixo: false as boolean,
            itemsAbaixoDoNome: ['Médica', 'Medicina', 'Sem'],
            fontesAbaixoDoNome: ['Block', 'MontSerrat'],
            procuraAbaixoDoNome : null,
            prefixos: [
                'Dr(a)',
                'Prof(a)',
                'Tec.',
                'Enf.',
            ]
        }
    },
    watch: {
        objetoNome: {
            handler() {
                if (this.comNome) {
                    this.$emit('setNomeBordado', this.objetoNome)
                }
            },
            deep: true
        },
        comNome() {
            if (this.comNome) {
                this.objetoNome.nome = this.VendaAbertastore.pessoaVenda.nome
            } else {
                this.objetoNome = {
                    abaixo_do_nome: {text : "Sem"}
                } as IBordadoNome
                this.$emit('setNomeBordado', this.objetoNome)
            }
        },

    },
    methods: {
        adicionaPrefixo(target: HTMLElement) {
            if (this.comPrefixo) {
                this.objetoNome.nome = this.objetoNome.nome.slice(this.indexPrefixo)
            }
            const prefixo = target.textContent
            this.indexPrefixo = prefixo ? prefixo.length : 0;
            this.objetoNome.nome = `${prefixo}${this.objetoNome.nome ? this.objetoNome.nome : ""}`
            this.comPrefixo = true
            this.menuPrefixo = false

        },
        tiraPrefixo() {
            this.objetoNome.nome = this.objetoNome.nome.slice(this.indexPrefixo)
            this.comPrefixo = false
        }
    },
    setup() {
        const VendaAbertastore = useVendaAbertaStore()
        const holdnome = ref("" as string)
        const objetoNome = ref({
            nome: "" as String,
            fonte: 'MonoType' as string,
            abaixo_do_nome: {
                text:'Sem', font:"Block"
            } as IAbaixoDoNome,
            cor: 'Preto' as string
        } as unknown as IBordadoNome,)
        return {
            VendaAbertastore,
            holdnome,
            objetoNome
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

.text-field-center :deep(input){
    text-align: center;
}
</style>

