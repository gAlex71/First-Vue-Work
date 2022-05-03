import Main from '@/pages/main.vue'
import postPage from '@/pages/postPage.vue'
import About from '@/pages/about.vue'
import idPage from '@/pages/idPage.vue'
import postPageWithStore from '@/pages/postPageWithStore.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: postPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: idPage
    },
    {
        path: '/store',
        component: postPageWithStore
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router