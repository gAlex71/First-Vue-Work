<template>
    <select v-model="modelValue" @click="changeOption">
        <option disabled value="">Выберите из списка</option>
        <option v-for="option in options" :key="option.value" :value="option.value">{{option.name}}</option>
    </select>
</template>

<script>
export default {
    name: 'my-select',
    props:{
        modelValue:{
            type: String
        },
        options:{
            type: Array,
            //По дефолту пустой массив
            default: () => []
        }
    },
    methods:{
        changeOption(event){
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style>

</style>