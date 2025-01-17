<template>
  <div>
    <div class="container">
      <NavBar></NavBar>
    </div>
    <div class="container">
      <div class="filters">
        <select v-model="filters.type" @change="updateFilters">
          <option value="">Все</option>
          <option value="sell">Продажа</option>
          <option value="buy">Покупка</option>
        </select>

        <select v-model="filters.category" @change="updateFilters">
          <option value="">Категория</option>
          <option v-for="category in getCategories" :key="category.id" :value="category.id">
            {{ category.name_ru }}
          </option>
        </select>

        <input v-model="filters.name" type="text" placeholder="Название" @input="updateFilters" />

        <button @click="clearFilters">Сбросить фильтры</button>
      </div>

      <div class="products">
        <CardList :products="getItems" @toggle-favorite="toggleFavorite" />
      </div>

      <div class="pagination">
        <button @click.prevent="loadPage(1)" :class="{ disabled: page <= 1 }">Первая</button>
        <button @click.prevent="loadPage(page - 1)" :class="{ disabled: page <= 1 }">«</button>

        <button 
          v-for="n in getTotalPages" 
          :key="n" 
          @click.prevent="loadPage(n)" 
          :class="{ active: page === n }">
          {{ n }}
        </button>

        <button @click.prevent="loadPage(page + 1)" :class="{ disabled: page >= getTotalPages }">»</button>
        <button @click.prevent="loadPage(getTotalPages)" :class="{ disabled: page >= getTotalPages }">Последняя</button>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavBar from "../components/default/NavBar.vue";
import CardList from "../components/card/CardList.vue";

export default {
  components: {
    NavBar,
    CardList,
  },
  data() {
    return {
      filters: {
        type: "",
        category: "",
        name: "",
      },
      page: 1,
    };
  },
  computed: {
    ...mapGetters(["getItems", "getCategories", "getTotalPages"]),
  },
  methods: {
    ...mapActions(["fetchItemsWithFilters"]),
    updateFilters() {
      this.page = 1;
      this.updateURL();
      this.fetchItemsWithFilters({ filters: this.filters, page: this.page });
    },
    clearFilters() {
      this.filters = {
        type: "",
        category: "",
        name: "",
      };
      this.updateFilters();
    },
    loadPage(page) {
      if (page >= 1 && page <= this.getTotalPages) {
        this.page = page;
        this.updateURL();
        this.fetchItemsWithFilters({ filters: this.filters, page: this.page })
        .them(() => window.scrollTo(0, 0));
      }
    },
    updateURL() {
      this.$router.push({
        query: {
          page: this.page,
          type: this.filters.type,
          category: this.filters.category,
          name: this.filters.name,
        },
      });
    },
    toggleFavorite(product) {
      console.log(`Товар с id ${product.id} добавлен в избранное`);
    },
  },
  async mounted() {
    const { page, type, category, name } = this.$route.query;
    this.filters.type = type || "";
    this.filters.category = category || "";
    this.filters.name = name || "";
    this.page = parseInt(page) || 1;

    await this.fetchItemsWithFilters({ filters: this.filters, page: this.page });
  },
};
</script>



<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination button {
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination button.active {
  background-color: #007bff;
  color: white;
}

.pagination button:hover {
  background-color: #f0f0f0;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
  justify-content: flex-start;
}

.filter-item {
  display: flex;
  flex-direction: column;
  width: 200px;
}

.filter-item label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #444;
}

.filter-item select,
.filter-item input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

.filter-item select:focus,
.filter-item input:focus {
  border-color: #4CAF50;
}

.filter-item button {
  background-color: #ff4081;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.filter-item button:hover {
  background-color: #d81b60;
}

.reset-button {
  width: 100%;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-item {
    width: 100%;
  }
}
</style>