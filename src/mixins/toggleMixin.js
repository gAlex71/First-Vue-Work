//Миксин - это переиспользуемый компонент для других компонентов
export default{
    //Этот пропс отвечает за то, видим ли модальное окно, или нет
    props:{
        show:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        hideDialog(){
            this.$emit('update:show', false)
        }
    },
    mounted(){
        
    }
}