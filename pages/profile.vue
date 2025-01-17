<template>
  <div>
    <div class="container">
      <NavBar></NavBar>
    </div>
    <div class="container">
      <div class="profile-page">
        <h1>Профиль пользователя</h1>
        <div v-if="user" class="profile-container">
          <div class="profile-photo">
            <img 
              :src="user.profile_photo ? 'http://localhost:8000' + user.profile_photo : '/placeholder.png'" 
              alt="Фото профиля" 
            />
          </div>
          <div class="profile-info">
            <p><strong>Имя пользователя:</strong> {{ user.username }}</p>
            <p><strong>Телефон:</strong> {{ user.phone_number || 'Не указано' }}</p>
            <p><strong>Telegram:</strong> {{ user.telegram || 'Не указано' }}</p>
            <p><strong>Баланс:</strong> {{ user.currency || '0' }}</p>
          </div>
          <button @click="logout" class="logout-button">Выйти</button>
        </div>
        <div v-else-if="error">
          <p class="error-message">Не удалось загрузить данные пользователя.</p>
        </div>
        <div v-else>
          <p>Загрузка данных пользователя...</p>
        </div>
      </div>

      <div class="user-products">
        <h2>Ваши продукты</h2>
        <div v-if="getUserProducts && getUserProducts.length > 0">
          <CardList :products="getUserProducts" @toggle-favorite="toggleFavorite" />
        </div>
        <div v-else>
          <p>У вас нет добавленных продуктов.</p>
        </div>

        <!-- Пагинация -->
        <div v-if="totalPages===1" class="pagination">
          <button @click.prevent="loadPage(1)" :class="{ disabled: page <= 1 }">Первая</button>
          <button @click.prevent="loadPage(page - 1)" :class="{ disabled: page <= 1 }">«</button>

          <button
            v-for="n in totalPages"
            :key="n"
            @click.prevent="loadPage(n)"
            :class="{ active: page === n }">
            {{ n }}
          </button>

          <button @click.prevent="loadPage(page + 1)" :class="{ disabled: page >= totalPages }">»</button>
          <button @click.prevent="loadPage(totalPages)" :class="{ disabled: page >= totalPages }">Последняя</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavBar from '~/components/default/NavBar.vue';
import CardList from "../components/card/CardList.vue";
import { fetchUser, logout } from "@/api/auth";

export default {
  data() {
    return {
      user: null,
      page: 1,
      error: false,
    };
  },
  components: {
    NavBar,
    CardList,
  },
  computed: {
    ...mapGetters(["getUserProducts", "getTotalPages"]),
    totalPages() {
      return this.getTotalPages; // Убедитесь, что getTotalPages корректно возвращает значение
    },
  },
  methods: {
    ...mapActions(["fetchUserProducts"]),
    async getUserAllProducts() {
      try {
        await this.fetchUserProducts({ page: this.page });
      } catch (error) {
        console.error("Ошибка при загрузке продуктов пользователя:", error);
      }
    },
    async getUserData() {
      try {
        const data = await fetchUser();
        if (data.status === 403) {
          alert("Ошибка 403: Доступ запрещен. Пожалуйста, авторизуйтесь заново.");
          return;
        }
        this.user = data;
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error);
        this.error = true;
      }
    },
    async logout() {
      try {
        if (confirm("Вы действительно хотите выйти?")) {
          await logout();
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Ошибка при выходе:", error);
      }
    },
    toggleFavorite(product) {
      console.log(`Товар с id ${product.id} добавлен в избранное`);
    },
    async loadPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.page = pageNumber;
        await this.getUserAllProducts();
      }
    },
  },
  async mounted() {
    await this.getUserData();
    await this.getUserAllProducts();
  },
};

</script>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.profile-container {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-photo img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}

.logout-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
}

.logout-button:hover {
  background-color: #e60000;
}

.error-message {
  color: #ff4d4d;
  font-weight: bold;
  margin-top: 20px;
}
</style>
