<template>
    <!-- Помещаем навбар таким образом, чтобы он отрисовывался на всех страницах приложения -->
    <navbar></navbar>
    <div class="app">
        <!-- Отрисовка роутов на странице -->
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
    components:{
        Navbar
    }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app{
    padding: 20px;
}
</style>