<template>
  <div class="container">
    <div class="cards">
      <div v-for="product in getBuyProducts" :key="product.id" class="card">
        <div class="card__content">
          <h1 class="title">{{ truncateText(product.title, 50) }}</h1>
          <p class="description">
            {{ truncateText(product.description, 100) }}
          </p>
        </div>
        <div class="card__footer">
          <div class="product-info">
            <span class="country">{{ product.country }}</span>
            <span class="date">{{ formatDate(product.create_date) }}</span>
          </div>
          <div class="actions">
            <a :href="`/product/${product.slug}`" class="read-more">Подробнее</a>
            <span class="add-to-favorites" @click="toggleFavorite(product)">
              <i :class="`fa-${product.in_favorite ? 'solid' : 'regular'} fa-heart`"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["getBuyProducts"]),
  },
  methods: {
    ...mapActions(["fetchBuyProducts"]),

    truncateText(text, length) {
      return text.length > length ? text.slice(0, length) + "..." : text;
    },

    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },

    toggleFavorite(product) {
      console.log(`Товар с id ${product.id} добавлен в избранное`);
    },
  },
  async mounted() {
    await this.fetchBuyProducts();
  },
};
</script>
  
<style>
@import url('~/assets/css/styles.css');
@import url('~/assets/css/cards.css');
</style>
