// Composables
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from "@/views/Home.vue"
import Vendas from "@/views/Vendas.vue"
import Venda from '@/views/Venda.vue'

const routes: RouteRecordRaw[] =[
  {
    path: '/',
    name: "Home",
    component: Home
  },
  {
    path: '/vendas',
    name: "Vendas",
    component: Vendas
  },
  {
    path: '/venda',
    name: "Venda",
    component: Venda
  }
] 

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router