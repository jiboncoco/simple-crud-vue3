//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'product.index',
        component: () => import( /* webpackChunkName: "product.index" */ '@/views/product/Index.vue')
    },
    {
        path: '/create',
        name: 'product.create',
        component: () => import( /* webpackChunkName: "product.create" */ '@/views/product/Create.vue')
    },
    {
        path: '/edit/:id',
        name: 'product.edit',
        component: () => import( /* webpackChunkName: "product.edit" */ '@/views/product/Edit.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

export default router