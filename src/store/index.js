//Создание глобального состояния приложения
import { createStore } from "vuex";
import { postModule } from "./postModule";

export default createStore({
    //Само состояние
    state:{
        isAuth: false
    },
    // //computed свойства, getters обязательно должны что-то возвращать
    // getters:{
    //     doubleLikes(state){
    //         return state.likes * 2
    //     }
    // },
    // //Мутации представляют собой функции, которые меняют состояние
    // mutations:{
    //     incrementLikes(state){
    //         state.likes +=1
    //     },
    //     decrementLikes(state){
    //         state.likes -= 1
    //     }
    // },
    // //Функции, которые внутри себя используют мутации
    // actions:{
        
    // },
    //Выносим логику в отдельный модуль, и подключаем его глобально
    modules:{
        post: postModule
    }
})