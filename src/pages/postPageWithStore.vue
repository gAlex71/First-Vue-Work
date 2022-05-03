<template>
    <!-- <div> -->
        <!-- Работа с модулем -->
        <!-- <h1>{{$store.state.post.limit}}</h1> -->
        <!-- Взаимодействие со store -->
        <!-- <h1>{{$store.state.isAuth ? "Пользователь авторизован" : "Авторизуйтесь, для просмотра постов"}}</h1>
        <h1>{{$store.state.likes}}</h1>
        <h1>{{$store.getters.doubleLikes}}</h1>
        <div>
            <my-button @click="$store.commit('incrementLikes')">Like</my-button>
            <my-button @click="$store.commit('decrementLikes')">Dislike</my-button>
    </div>-->

        <h1>Страница с постами</h1>
        <my-input :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск..."/>
        <div class="app__btns">
            <my-button @click="showDialog">Создать пост</my-button>
            <!-- <my-select v-model="selectedSort" :options="sortOptions"></my-select> -->
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form
                @create="createPost"
            />
        </my-dialog>
        <!-- В props передаем posts -->
            <post-list 
            :posts = "sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка...</div> -->
        <!-- Добавляем прогрузку остальных постов при скролле -->
        <!-- Передаем в директиву функцию -->
        <div v-intersection="loadMorePosts"></div>
         <div 
            class="page__wrapper">
            <div v-for="pageNum in totalPages" 
            :key="pageNum" 
            class="page"
            :class="{
                'current-page': page === pageNum
            }"
            @click="changePage(pageNum)"
        >
            {{pageNum}}
        </div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

    export default{
        // Компоненты, которые мы хотим использовать в шаблоне
        components:{
            PostForm, PostList,
        },
        data(){
            return {
                dialogVisible: false
            }
        },
        methods:{
            ...mapMutations({
                setPage: 'post/setPage',
                setSearchQuery: 'post/setSearchQuery'
            }),
            ...mapActions({
                loadMorePosts: 'post/loadMorePosts',
                fetchPosts: 'post/fetchPosts'
            }),
            createPost(post){
                //Добавляем созданный дочерний пост в наш массив
                this.posts.push(post)
                //Скрываем диалоговое окно, после создания поста
                this.dialogVisible = false
            },
            removePost(post){
                //Фильтр возвращает массив постов, без айдишника поста, который пытаемся удалить, перезаписывая изначальный массив постов
                this.posts = this.posts.filter(p => p.id !== post.id)
            },
            showDialog(){
                this.dialogVisible = true
            },
            // changePage(pageNum){
            //     this.page = pageNum
            // },
            // async fetchPosts(){
            //     try{
            //         //Загрузка страницы
            //         this.isPostsLoading = true
            //         //Делаем запрос на сервер
            //         const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            //             params:{
            //                 _page: this.page,
            //                 _limit: this.limit
            //             }
            //         })
            //         //Вычисляем количество страниц с постами, и используем округление в большую сторону
            //         this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            //         //Помещаем в posts, то что пришло от сервера
            //         this.posts = response.data;
            //     }catch(e){
            //         alert('Ошибка')
            //     }finally{
            //         this.isPostsLoading = false
            //     }
            // },
            // async loadMorePosts(){
            //     try{
            //         //При вызове этой функции каждый раз увеличиваем номер страницы на единицу
            //         this.page += 1
            //         //Делаем запрос на сервер
            //         const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            //             params:{
            //                 _page: this.page,
            //                 _limit: this.limit
            //             }
            //         })
            //         //Вычисляем количество страниц с постами, и используем округление в большую сторону
            //         this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            //         //Помещаем в posts, посты, которые у нас есть, и по мере скролла прогружаем остальные
            //         this.posts = [...this.posts, ...response.data]
            //     }catch(e){
            //         alert('Ошибка')
            //     }
            // }
        },
        //Динамическая подгрузка постов при загрузке страницы в хуке mounted
        mounted(){
            this.fetchPosts() 
        },
        computed:{
            ...mapState({
                posts: state => state.post.posts,
                //Подгрузка страницы
                isPostsLoading: state => state.post.isPostsLoading,
                selectedSort: state => state.post.selectedSort,
                searchQuery: state => state.post.searchQuery,
                //Номер страницы, и лимит постов на странице
                page: state => state.post.page,
                limit: state => state.post.limit,
                totalPages: state => state.post.totalPages,
                //Сортировка у нас будет по заголовку и описанию
                sortOptions: state => state.post.sortOptions
            }),
            ...mapGetters({
                sortedPosts: 'post/sortedPosts',
                sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
            })
        },
        watch:{
            //Функция наблюдатель, которая будет следить за сменой страницы
            //Вместе с изменением номера страницы, подгружаем соответсвующие посты
            // page(){
            //     this.fetchPosts()
            // }
        }
    }
</script>

// scoped - стили применимы только к этому файлу, и недоступны извне
<style>
.app__btns{
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}
.page__wrapper{
    display: flex;
    margin-top: 15px;
    cursor: pointer;
}
.page{
    border: 1px solid teal;
    padding: 10px;
}
.current-page{
    border: 2px solid black;
}
</style>