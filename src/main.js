import { createApp } from 'vue'
import App from '@/App'
import components from '@/components/UI'
import router from '@/router/router'
import Vintersection from '@/directives/Vintersection'
import directives from '@/directives'
import store from '@/store'

const app = createApp(App)

components.forEach(component =>{
    app.component(component.name, component)
})

//Подключение директив
directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app
//Подключаем роуты
    .use(router)
    .use(store)
    .mount('#app')
