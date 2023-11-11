<template>
    <v-container class="pa-0 ma-0">
        <v-row align="center" no-gutters >
            <v-col cols="2">
                <v-switch density="compact" v-model="comNome" hide-details :label="labelNome"></v-switch>
            </v-col>
            <v-col cols="10">
                <v-row align="center" v-if="comNome">
                    <v-col cols="9">
                        <v-text-field hide-details v-model="nomeEscolhido" class="text-center pa-0" :style="{ ...estiloNome, fontSize: '40px'}" density="compact"/>
                    </v-col>
                    <v-col cols="2">
                        <div class="text-center">
                            <v-menu v-model="menu" :close-on-content-click="false" location="end">
                                <template v-slot:activator="{ props }">
                                    <v-btn class="$" v-bind="props" density="compact">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                </template>
    
                                <v-card min-width="150">
    
                                    <v-list>
                                        <v-list-item>
                                            <v-select class="mt-2" label="Fonte" :items="fontes" v-model="fonteNome"
                                                hide-details density="compact" variant="outlined"></v-select>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-text-field class="mt-2" variant="outlined" label="Cor"
                                                v-model="corNome" hide-details density="compact">
                                            </v-text-field>
                                        </v-list-item>
                                    </v-list>
                                </v-card>
                            </v-menu>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
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
                fontFamily: this.fonteNome,
                color: this.corNome,
                fontSize: this.fontSize
            };
            if (this.fonteNome == 'Montserrat') {
                estilo.fontWeight = 'bold';
            } else {
                estilo.fontWeight = this.fontWeight;
            }
            return estilo as { [key: string]: string };
        },
    },
    data() {
        return {
            comNome: false as boolean,
            labelNome: "Nome" as string,
            fonteNome: "MonoType" as string,
            fontWeight: "400" as string,
            fontSize: '40px' as string,
            corNome: "" as string,
            menu: false as boolean,
            pa: 'pa-0'
        }
    },
    watch:{
        comNome(){
            if (this.comNome){
                this.labelNome = ""
            }else{
                this.labelNome = "Nome"
            }
        }
    },
    setup(){
        const VendaAbertastore = useVendaAbertaStore()
        const NomepessoaVenda = ref("" as String)
        const nomeEscolhido = ref("" as String)
        onMounted( () => {
            nomeEscolhido.value = NomepessoaVenda.value
        })
        watch(
            () => VendaAbertastore.getpessoaVenda,
            () => {
                NomepessoaVenda.value = VendaAbertastore.getpessoaVenda.nome
                nomeEscolhido.value = NomepessoaVenda.value 
            }
        )
        return{
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
</style>''

