<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-focus v-model="searchQuery" placeholder="Поиск..."/>
        <div class="app__btns">
            <my-button @click="showDialog">Создать пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions"></my-select>
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
        <div v-else>Идет загрузка...</div>
        <!-- Добавляем прогрузку остальных постов при скролле -->
        <!-- Передаем в директиву функцию -->
        <div v-intersection="loadMorePosts"></div>
        <!-- <div 
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
        </div> -->
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";

    export default{
        // Компоненты, которые мы хотим использовать в шаблоне
        components:{
            PostForm, PostList,
        },
        data(){
            return {
                posts: [],
                dialogVisible: false,
                //Подгрузка страницы
                isPostsLoading: false,
                selectedSort: '',
                searchQuery: '',
                //Номер страницы, и лимит постов на странице
                page: 1,
                limit: 10,
                totalPages: 0,
                //Сортировка у нас будет по заголовку и описанию
                sortOptions: [
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'}
                ]
            }
        },
        methods:{
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
            async fetchPosts(){
                try{
                    //Загрузка страницы
                    this.isPostsLoading = true
                    //Делаем запрос на сервер
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params:{
                            _page: this.page,
                            _limit: this.limit
                        }
                    })
                    //Вычисляем количество страниц с постами, и используем округление в большую сторону
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                    //Помещаем в posts, то что пришло от сервера
                    this.posts = response.data;
                }catch(e){
                    alert('Ошибка')
                }finally{
                    this.isPostsLoading = false
                }
            },
            async loadMorePosts(){
                try{
                    //При вызове этой функции каждый раз увеличиваем номер страницы на единицу
                    this.page += 1
                    //Делаем запрос на сервер
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params:{
                            _page: this.page,
                            _limit: this.limit
                        }
                    })
                    //Вычисляем количество страниц с постами, и используем округление в большую сторону
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                    //Помещаем в posts, посты, которые у нас есть, и по мере скролла прогружаем остальные
                    this.posts = [...this.posts, ...response.data]
                }catch(e){
                    alert('Ошибка')
                }
            }
        },
        //Динамическая подгрузка постов при загрузке страницы в хуке mounted
        mounted(){
            this.fetchPosts() 
        },
        computed:{
            sortedPosts(){
                return [...this.posts].sort((post1, post2) => {
                    //Сравнение строк
                    return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
                })
            },
            sortedAndSearchedPosts(){
                //Так же приводим поиск к одному регистру
                return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
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