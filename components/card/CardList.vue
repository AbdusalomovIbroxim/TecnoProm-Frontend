<template>
  <div class="cards">
    <CardBase
      v-for="product in products"
      :key="product.id"
      :type="product.type"
      :title="truncateText(product.title, 50)"
      :description="product.type === 'buy' ? truncateText(product.description, 100) : null"
      :image="product.type === 'sell' && product.images.length > 0 ? `http://localhost:8000${product.images[0].image}` : null"
      :category="getCategoryName(product.category)"
      :country="String(product.country)"
      :date="formatDate(product.create_date)"
      :detailsLink="`/product/${product.slug}`"
      :isFavorite="product.in_favorite"
      @toggle-favorite="toggleFavorite(product)"
    />
  </div>
</template>

<script>
  import CardBase from "./CardBase.vue";
    import { mapGetters, mapActions } from "vuex";
  
  export default {
    components: { CardBase },
  
    props: {
      products: Array,
      categories: Array,
    },
    computed: {
    ...mapGetters(["getCategories"]),
    },
    methods: {
      ...mapActions(["fetchCategories"]),

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
        console.log('categorii', this.getCategories);

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

    if (!this.getCategories.length) {
      await this.fetchCategories();
    }
  },
  };
  </script>