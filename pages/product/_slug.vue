<template>
    <div v-if="product">
      <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
      <!-- Тут можно отобразить другие данные продукта -->
    </div>
    <div v-else>
      <p>Загрузка...</p>
    </div>
  </template>
  
  <script>
  export default {
    async mounted() {
      const slug = this.$route.params.slug; // Получаем slug из URL
      await this.$store.dispatch('fetchProductBySlug', slug); // Загружаем продукт
    },
  
    computed: {
      product() {
        return this.$store.getters.getProduct; // Получаем продукт из store
      }
    }
  };
  </script>
  