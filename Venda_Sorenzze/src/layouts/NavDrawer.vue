<template>
    <v-navigation-drawer v-model="drawer" :rail="rail"  @click="rail = false">
        <v-list-item
            prepend-avatar="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
            title="Avatar"
            >
            <template v-slot:append>
                <v-btn variant="text" icon="arrow_back_ios" @click.stop="rail = !rail"></v-btn>
            </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>
            <v-list-item prepend-icon="home" title="Página Inicial" value="home" to="/" @click.stop="rail = !rail"/>
            <v-list-item prepend-icon="sell" title="Vendas" value="vendas" to="/vendas" @click.stop="rail = !rail"/>
            <v-list-item prepend-icon="menu_book" title="Produtos" value="vendas" to="/produtos" @click.stop="rail = !rail"/>
            <v-list-item prepend-icon="attach_money" title="Finanças" value="financas" @click.stop="rail = !rail"/>
        </v-list>
    </v-navigation-drawer>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: "NavDrawer",
    data() {
        return {
            drawer: true,
            rail: true,
        }
    },
    methods:{
        closeDrawer(){
            (this.$refs.drawer as any).closeDrawer();
        }
    }
})
</script>
  