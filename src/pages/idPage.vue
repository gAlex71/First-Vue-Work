<template>
  <div>
      <!-- С помощью route мы можем получить некоторую информацию о пути -->
      <h1>Это страница поста: {{$route.params.id}}</h1>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>