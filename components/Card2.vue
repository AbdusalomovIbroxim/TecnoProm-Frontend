<template>
  <div class="container">
    <!-- <h2>Продукты для продажи</h2> -->
    <div class="cards">
      <div v-for="product in getSellProducts" :key="product.id" class="card">
        <div class="card__content">
          
          <div class="card__image">
            <img 
              style="position: absolute; left: 0; top: 0; max-height: 160px; width: 100%; height: 100%; object-fit: cover;"
              :src="product.images.length > 0 ? `http://localhost:8000${product.images[0].image}` : '/default-image.png'"
              alt="Product image"
            />
          </div>
          <p style="padding-top: 145px; display: flex; align-items: center;">
            <img 
              :src="getCategoryName(product.category).icon" 
              alt="Category Icon" 
              style="width: 20px; height: 20px; margin-right: 8px;"/>
            {{ getCategoryName(product.category).name }}
          </p>


          <h1 class="title">
            {{ truncateText(product.title, 50) }}
          </h1>
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
    ...mapGetters(["getSellProducts", "getCategories"]), // Подключаем getter для категорий
  },
  methods: {
    ...mapActions(["fetchSellProducts", "fetchCategories"]), // Подключаем action для категорий

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

    getCategoryName(categoryId) {
      const category = this.getCategories.find((cat) => cat.id === categoryId);
      if (category) {
        return {
          name: category.name_ru,
          icon: `http://localhost:8000${category.icon}`,
        };
      }
      return {
        name: "Неизвестная категория",
        icon: "/static/images/categories/default.png",
      };
    },

  },
  async mounted() {
    // Загружаем данные продуктов и категорий
    await this.fetchSellProducts(); 

    if (!this.getCategories.length) {
      await this.fetchCategories();
    }
  },
};

</script>

<style>
  @import url('~/assets/css/styles.css');
  @import url('~/assets/css/cards.css');
</style>
