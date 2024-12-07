<template>
  <div>
    <div class="container">
      <NavBar></NavBar>
    </div>
    <div class="container">
      <div class="cards">
        <CardList :products="getItems" @toggle-favorite="toggleFavorite" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavBar from "../components/NavBar.vue";
import CardList from "../components/card/CardList.vue";

export default {

  components: {
    NavBar,
    CardList,
  },

  computed: {
    ...mapGetters(["getItems", "getCategories"]),
  },
  methods: {
    ...mapActions(["fetchItems"]),
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
        icon: "@/static/images/categories/default.png",
      };
    },
  },
  async mounted() {
    await this.fetchItems();
  },
  
};
</script>
