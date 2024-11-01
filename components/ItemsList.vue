<template>
    <div class="container">
      <h1>Продукты на продажу</h1>
      <ul>
        <li v-for="product in getBuyProducts" :key="product.id">{{product.pk}} - {{ product.title }}</li>
      </ul>
  
      <h1>Продукты для покупки</h1>
      <ul>
        <li v-for="product in getBuyProducts" :key="product.id">{{product.pk}} - {{ product.title }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        loading: true,
        error: null,
      };
    },
  
    computed: {
      ...mapGetters(['getBuyProducts']), // Получаем список продуктов для покупки из Vuex
    },
  
    methods: {
      ...mapActions(['fetchBuyProducts']), // Получаем действия из Vuex
    },
  
    async mounted() {
      await this.fetchBuyProducts();
      console.log(this.getBuyProducts);
    },
  };
  </script>
  