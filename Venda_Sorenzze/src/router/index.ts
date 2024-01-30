// Composables
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from "@/views/Home.vue"
import Vendas from "@/views/Vendas.vue"
import Venda from '@/views/Venda.vue'
import Catalogo from '@/views/Catalogo.vue'

const routes: RouteRecordRaw[] =[
  {
    path: '/',
    name: "Home",
    component: Home
  },
  {
    path: '/vendas',
    name: "vendas",
    component: Vendas
  },
  {
    path: '/venda/:id?',
    name: "venda",
    component: Venda
  },
  {
    path: '/produtos',
    name: "Produtos",
    component: Catalogo
  }
] 

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router