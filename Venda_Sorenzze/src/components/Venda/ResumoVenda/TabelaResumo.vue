<!-- eslint-disable vue/no-useless-template-attributes -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-card height="fitContent">
        <v-card-title @click.prevent="console.log(produtos)"
            class="text-center text-body-1 py-0 tituloCard">Produtos</v-card-title>
        <v-card-text class="px-0 py-2 mx-0">
            <v-data-table :items="produtos" fixed-footer v-model:expanded="expanded" item-value="id" :headers="tableHeaders"
                class="mr-4" height="100%">
                <template v-slot:expanded-row="{ item, columns }" height="100%">
                    <ExapandedRowTblResumo :item="item" :columns="columns"></ExapandedRowTblResumo>
                </template>
                <template #item="{ item }">
                    <tr @click.prevent="expandRow(item.id, $event)" :ref="JSON.stringify(item.id)">
                        <td>
                            <p class="" style="textWrap: nowrap;">{{ item.nome }}</p>
                        </td>
                        <td>
                            <p class="text-center"  >{{ item.tamanho }}</p>
                        </td>
                        <td>
                            <p class="text-right">{{ (item.valor).toFixed(2) }}</p>
                        </td>
                        <td>
                            <p class="text-center">{{ item.quantidade }}</p>
                        </td>
                        <td>
                            <p class="">{{ item ? ((item.valor as number) * item.quantidade).toFixed(2) : "" }}</p>
                        </td>
                        <td class="pa-1 text-right opcoes">
                            <v-row class="d-flex align-center justify-space-between opcoes" no-gutters align="center">
                                <v-col cols="2" class="mx-1 opcoes"><v-btn class="opcoes" variant="flat" :ripple="false" :hover="false"
                                        size="regular" icon="content_copy"></v-btn></v-col>
                                <v-col cols="2" class="mx-1"><v-btn variant="flat" :ripple="false" :hover="false"
                                        size="regular" icon="edit"></v-btn></v-col>
                                <v-col cols="2" class="mx-1"><v-btn variant="flat" :ripple="false" :hover="false"
                                        size="regular" icon="delete"></v-btn></v-col>
                            </v-row>
                        </td>
                    </tr>
                </template>
                <template v-slot:bottom>
                    <BottomTblResumo @salvaDesconto="salvaDesconto" @salvaFrete="salvaFrete"
                        :total-venda="valores.valor_total"></BottomTblResumo>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>
  
<script lang="ts">

import ExapandedRowTblResumo from './ExpandedRowTblResumo.vue'
import BottomTblResumo from './BottomTblResumo.vue'
import { useVendaAbertaStore } from '@/store/VendaAberta'
import { defineComponent, watch } from 'vue'
import { ITipoValor } from '@/interfaces/Venda';
import { IProduto } from '@/interfaces/Produto';
import { storeToRefs } from 'pinia';

export default defineComponent({
    name: 'TabelaResumo',
    components: {
        ExapandedRowTblResumo,
        BottomTblResumo
    },
    data() {
        return {
            expanded: [] as any[],
            tableHeaders: [
                { title: 'Produto', align: 'start', sortable: false, key: 'nome' },
                { title: 'Tmn', key: 'tamanho', align: 'center', sortable: false },
                { title: 'R$(UN)', key: 'valor', align: 'end' },
                { title: 'Qtd', key: 'quantidade', sortable: false, align: 'center' },
                { title: 'Total', key: 'total', sortable: false },
                { title: 'Opções', key: 'opcoes', align: 'end', sortable: false },
            ] as unknown as []
        }
    },

    methods: {
        salvaFrete(objeto: ITipoValor) {
            this.valores.frete = objeto
        },
        salvaDesconto(objeto: ITipoValor) {
            this.valores.desconto = objeto
        },
            expandRow(id: number, event:Event) {
                const ElementoClickado = event.target as HTMLElement
                if (ElementoClickado.closest('.opcoes')){
                    if(ElementoClickado.innerHTML.includes('copy')){
                        const produtoCopiado = Object.assign({}, this.produtos.find(produto => produto.id == id)) as IProduto;
                        produtoCopiado.id = this.vendaAberta.getIdDoProximoProduto
                        this.produtos.push(produtoCopiado)
                    }else if (ElementoClickado.innerHTML.includes('edit')){
                        console.log('Editar Produto')
                    }else if (ElementoClickado.innerHTML.includes('delete')){
                        this.produtos = this.produtos.filter(produto => produto.id != id)
                    }
            }else if (!this.expanded.includes(id)) {
                this.expanded.pop()
                this.expanded.push(id);
                (this.$refs[id.toString()] as HTMLElement).classList.add('selectedRow');
                const colunaDeBotoes = (this.$refs[id.toString()] as HTMLElement).lastElementChild?.lastElementChild?.querySelectorAll('div')
                colunaDeBotoes?.forEach(btn => {
                    btn.lastElementChild?.classList.add('selectedRow')
                })
            } else {
                this.expanded.pop();
                (this.$refs[id.toString()] as HTMLElement).classList.remove('selectedRow')
                const colunaDeBotoes = (this.$refs[id.toString()] as HTMLElement).lastElementChild?.lastElementChild?.querySelectorAll('div')
                colunaDeBotoes?.forEach(btn => {
                    btn.lastElementChild?.classList.remove('selectedRow')
                })
            }
        }
    },
    setup() {
        const vendaAberta = useVendaAbertaStore()
        const { produtos, valores } = storeToRefs(vendaAberta)
        watch(
            produtos,
            () =>{
                let total = 0
                produtos.value.forEach((produto:IProduto)=> {
                    total = total + produto.valor
                })
                valores.value.valores_produtos = total
            },{deep : true  }
        )
        watch(
            valores,
            () =>{
                console.log(valores.value)
                let total = 0 as number
                Object.entries(valores.value).forEach((valor:[string,number|ITipoValor]) => {
                    const [key, value] = valor
                    console.log(key, value)
                    if (key == 'valores_produtos'){
                        total = total + (value as number)
                    }
                    else if (key == 'frete'){
                        total = total + ((value as ITipoValor).valor as number)
                    }
                    else if (key == 'desconto'){
                        if ((value as ITipoValor).tipo == 'Porcentagem'){
                            let desconto = total*((value as ITipoValor).valor/100)
                            total = total - desconto
                        }else if((value as ITipoValor).tipo == 'Valor'){
                            total = total - (value as ITipoValor).valor
                        }
                    }})
                valores.value.valor_total = total
            },{deep : true  }
        )
        return {
            vendaAberta,
            valores,
            produtos
        }
    }
})
</script>

<style lang="scss">
.selectedRow {
    background: rgb(221, 221, 221);
    animation: none
}
</style>
