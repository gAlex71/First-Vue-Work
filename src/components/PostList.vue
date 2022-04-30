<template>
    <div v-if="posts.length > 0">
        <h3>Список пользователей:</h3>
        <transition-group name="user-list">
            <post-item 
                v-for="post in posts"  
                :post = "post"
                :key="post.id"
                @remove="$emit('remove', post)"
            />
        </transition-group>
    </div>
    <div v-else>
        <h3>Список пользователей пуст!</h3>
    </div>  
</template>

<script>
import PostItem from './PostItem.vue'
export default {
  components: { PostItem },
    //Что ожидается принять в props на вход
    //В дочернем элементе props менять нельзя!
    props:{
        posts:{
            type: Array,
            required: true//Сделать обязательными
        }
    }
}
</script>

<style scoped>
.user-list-item{
    display: inline-block;
    margin-right: 10px;
}
.user-list-enter-active,
.user-list-leave-active{
    transition: all 0.5s ease;
}
.user-list-enter-from,
.user-list-leave-to{
    opacity: 0;
    transform: translateX(130px);
}
.user-list-move{
    transition: transform 0.5s ease;
}
</style>