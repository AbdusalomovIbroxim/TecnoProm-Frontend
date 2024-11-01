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
            <a :href="`/product-detail/${product.slug}`" class="read-more">Подробнее</a>
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
    ...mapGetters(["getBuyProducts"]), // Получаем список продуктов из Vuex
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
    await this.fetchBuyProducts(); // Загружаем продукты при монтировании компонента
  },
};
</script>
  
  <style scoped>
/* Основной контейнер карточек */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  padding-top: 100px;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: calc(25% - 20px); /* 4 карточки в ряд */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  /* min-height: 350px;
    max-height: 350px;  */
  height: 300px;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

/* Контент карточки */
.card__content {
  flex-grow: 1;
  margin-bottom: auto;
}

.title {
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 10px;
}

.description {
  font-size: 0.95em;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.4; /* Высота строки */
  display: -webkit-box; /* Используем flexbox для обрезки текста */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5; /* Ограничиваем на 5 строк */
  overflow: hidden; /* Скрываем переполнение */
}

/* Информация о продукте (страна, дата) и действия (ссылка и лайк) */
.product-info {
  display: flex;
  justify-content: space-between;
  margin-top: auto; /* Сдвигаем информацию вниз карточки */
  font-size: 0.9em;
  color: #999;
}

.country,
.date {
  font-size: 0.9em;
}

.card__footer {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
}

.actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.read-more {
  color: #007bff;
  font-size: 0.9em;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}

.add-to-favorites {
  font-size: 1.2em;
  color: #f00;
  cursor: pointer;
}

.add-to-favorites i {
  transition: color 0.3s;
}

.add-to-favorites i.fa-solid {
  color: #f00;
}

.add-to-favorites i.fa-regular {
  color: #aaa;
}

.add-to-favorites i:hover {
  color: #f00;
}
</style>
  