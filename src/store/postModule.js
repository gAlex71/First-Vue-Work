export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters:{
        sortedPosts(state){
            return [...state.posts].sort((post1, post2) => {
                //Сравнение строк
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
        },
        sortedAndSearchedPosts(state, getters){
            //Так же приводим поиск к одному регистру
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        } 
    },
    //Для каждого поля создаем по одноименной мутации
    mutation:{
        setPosts(state, posts){
            state.posts = posts
        },
        setLoading(state, bool){
            state.isPostsLoading = bool
        },
        setPage(state, page){
            state.page = page
        },
        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages){
            state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery){
            state.searchQuery = searchQuery
        }
    },
    actions:{
        async fetchPosts({state, commit}){
            try{
                //Загрузка страницы
                commit('setLoading', true)
                //Делаем запрос на сервер
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params:{
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                //Вычисляем количество страниц с постами, и используем округление в большую сторону
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                //Помещаем в posts, то что пришло от сервера
                commit('setPosts', response.data)
            }catch(e){ 
                alert('Ошибка')
            }finally{
                commit('setLoading', false)
            }
        },
        async loadMorePosts(state, commit){
            try{
                //При вызове этой функции каждый раз увеличиваем номер страницы на единицу
                commit('setPage', state.page += 1)
                //Делаем запрос на сервер
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params:{
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                //Вычисляем количество страниц с постами, и используем округление в большую сторону
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / this.limit))
                //Помещаем в posts, посты, которые у нас есть, и по мере скролла прогружаем остальные
                commit('setPosts', [...state.posts, ...response.data])
            }catch(e){
                alert('Ошибка')
            }
        }
    }
}