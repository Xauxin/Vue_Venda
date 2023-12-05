<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/no-useless-template-attributes -->
<template>
    <td class="pa-1" :colspan="columns.length">
        <v-row no-gutters aling="top">
            <v-col cols="8">
                <v-card class="ma-1 pa-1" height="99%">
                    <v-data-table :items="item.produtos">
                        <template #headers></template>
                        <template #bottom></template>
                        <template #item="{ item }">
                            <tr>
                                <td>
                                    <p>{{ item.quantidade }}</p>
                                </td>
                                <td class="d-flex align-center justify-space-between">
                                    <p>{{ item.nome }}</p>
                                    <v-tooltip>
                                        <template #default>
                                            <div class="d-flex align-center justify-space-between"
                                                v-for="(value, key) in item.modelagem" :key="key">
                                                <p>{{ key }} : {{ value }}</p>
                                                <p></p>
                                            </div>
                                        </template>
                                        <template #activator="{ props }">
                                            <v-icon v-bind="props">more</v-icon>
                                        </template>
                                    </v-tooltip>
                                </td>
                                <td>
                                    <p>{{ item.tamanho }}</p>
                                </td>
                                <td>
                                    <p>{{ item.cor }}</p>
                                </td>
                                <td>
                                    <p v-if="Object.entries(item.medidas).length > 0">{{ `Com Medidas e Alterações` }}</p>
                                    <p v-else>Padrão</p>
                                </td>
                                <td>
                                    <v-tooltip v-if="Object.entries(item.bordados).length > 0" location="top">
                                        <template #activator="{ props }">
                                            <p v-bind="props">{{ `Com ${Object.entries(item.bordados).length} Bordado` }}</p>
                                        </template>
                                        <template #default>
                                            <p v-for="(value, key) in item.bordados" class="text-capitalize" :key="key">{{
                                                (key as string).includes('outro') ? (key as string).split('/')[1] : (key as
                                                    string).replace("_", ' ').replace("_", ' ') }}</p>
                                        </template>
                                    </v-tooltip>
                                    <p v-else-if="item.bordados.bordado_dnome">Com bordado do Nome</p>
                                    <p v-else>Sem Bordados</p>
                                </td>
                                <td>
                                    <p>R${{ item.valor.toFixed(2) }}</p>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card class="ma-1 pa-1 d-flex-column justify-end" height="99%">
                    <v-card-title class="text-center text-caption pa-0">
                        Pagamentos
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="pa-0 ma-0">
                        <v-list density="compact" :items="item.adiantamentos">
                            <template v-slot:prepend="{ item }">
                                <v-icon v-if="item.tipo == 'cartao'" icon="credit_card"></v-icon>
                                <v-icon v-else-if="item.tipo == 'pix'" icon="PixIcon">
                                    <PixIcon></PixIcon>
                                </v-icon>
                                <v-icon v-else-if="item.tipo == 'dinheiro'" icon="payments"></v-icon>
                            </template>
                            <template v-slot:title="{ item }">
                                <p>{{ item.valor_pago.toFixed(2) }}</p>
                            </template>
                            <template v-slot:append="{ item }">
                                <p>{{ diaEMesdeData(item.data.toString()) }}</p>
                            </template>
                        </v-list>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn size="small" density="comfortable" color="primary" variant="flat">Faturar</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn size="small" density="comfortable" color="yellow" variant="flat">Adiant...</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="1">
                <v-card :class="'ma-1 pa-1'" height="99%">
                    <v-card-title class="text-center text-caption pa-0">
                        Açoes
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="ma-0 pa-0">
                        <v-list density="compact">
                            <v-list-item class="text-center">
                                <v-tooltip text="Editar Venda">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon="edit" v-bind="props" density="comfortable" rounded class="px-6"
                                            variant="tonal"></v-btn>
                                    </template>
                                </v-tooltip>
                            </v-list-item>
                            <v-list-item class="text-center"><v-btn icon="receipt_long" rounded class="px-6"
                                    density="comfortable" variant="tonal"></v-btn></v-list-item>
                            <v-list-item class="text-center"><v-btn icon="print" rounded class="px-6" density="comfortable"
                                    variant="tonal"></v-btn></v-list-item>
                            <v-list-item class="text-center">
                                <v-menu v-model="menuMaisOpcoesPedido" :close-on-content-click="false" location="center">
                                    <template v-slot:activator="{ props }">
                                        <v-btn class="px-6" v-bind="props" variant="tonal" rounded density="comfortable"
                                            icon="more_horiz">
                                        </v-btn>
                                    </template>
                                    <v-card style="overflow-y: hidden" class="cardBotoes">
                                        <v-card-text class="ma-0 pa-1">
                                            <v-row no-gutters>
                                                <v-col class="ma-0 pa-1" cols="4"><v-btn icon="delete" variant="tonal"
                                                        size="small" rounded></v-btn></v-col>
                                                <v-col class="ma-0 pa-1" cols="4"><v-btn icon="shopping_bag" variant="tonal"
                                                        size="small" rounded></v-btn></v-col>
                                                <v-col class="ma-0 pa-1" cols="4"><v-btn icon="person" variant="tonal"
                                                        size="small" rounded></v-btn></v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col class="ma-0 pa-1" cols="4"><v-btn icon="content_copy" variant="tonal"
                                                        size="small" rounded></v-btn></v-col>
                                                <v-col class="ma-0 pa-1" cols="4"><v-btn icon="picture_as_pdf"
                                                        variant="tonal" size="small" rounded></v-btn></v-col>
                                                <v-col class="ma-0 pa-1" cols="4"><v-btn icon="" variant="tonal" rounded
                                                        size="small"><v-icon>
                                                            <WhatsIcon></WhatsIcon>
                                                        </v-icon></v-btn></v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col class="ma-0 pa-1" cols="4"><v-btn icon="" variant="tonal"
                                                        size="small" rounded></v-btn></v-col>
                                                <v-col class="ma-0 pa-1" cols="4"><v-btn icon="description" variant="tonal"
                                                        size="small" rounded></v-btn></v-col>
                                                <v-col class="ma-0 pa-1" cols="4"><v-btn icon="call" variant="tonal"
                                                        size="small" rounded></v-btn></v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-menu>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </td>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IVenda } from "@/interfaces/Venda";


export default defineComponent({
    name: "ExpandedRowTblVendas",
    props: {
        item: {
            type: Object as () => IVenda,
            required: true,
        },
        columns: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            menuMaisOpcoesPedido: false as boolean,
            maisInfoValores: false as boolean,
        };
    },
    methods: {
        diaEMesdeData(dataEmString: string) {
            const listDiaMesAno = dataEmString.split("/");
            const diaEMesdeData = `${listDiaMesAno[0]}/${listDiaMesAno[1]}`;
            return diaEMesdeData;
        },
    },
});
</script>

<style type="text/css"></style>
