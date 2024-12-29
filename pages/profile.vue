<template>
  <div class="">
    <NavBar></NavBar>
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
          <!-- <p><strong>Email:</strong> {{ user.email }}</p> -->
          <p><strong>Телефон:</strong> {{ user.telephone || 'Не указано' }}</p>
          <p><strong>Telegram:</strong> {{ user.telegram || 'Не указано' }}</p>
          <!-- <p><strong>Бизнес-аккаунт:</strong> {{ user.is_business_account ? 'Да' : 'Нет' }}</p> -->
          <p><strong>Баланс:</strong> {{ user.currency || '0' }}</p>
          <!-- <p><strong>Телефон подтверждён:</strong> {{ user.is_phone_verified ? 'Да' : 'Нет' }}</p> -->
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
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';
import { fetchUser, logout, refreshToken } from "@/api/auth";

export default {
  data() {
    return {
      user: null,
      error: false,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    async getUserData() {
      try {
        let data = await fetchUser();
        console.log("Данные пользователя:", data);
        if (data.status == 403) {
          alert("Ошибка 403: Доступ запрещен. Пожалуйста, авторизуйтесь заново.");
          return;
        }
        this.user = data; // Присваиваем данные пользователя переменной user
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
  },
  async mounted() {
    await this.getUserData();
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
