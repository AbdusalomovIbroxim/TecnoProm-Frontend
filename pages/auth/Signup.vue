<style>
@import url('@/assets/css/auth.css');
</style>

<template>
  <div class="authentication register">
    <div class="main-header__logo">
      <router-link to="/">
        <img src="@/static/images/TECNOPROM-LOGO.png" alt="logo" />
      </router-link>
    </div>
    <div class="form register">
      <div class="form-content">
        <div class="form-text">
          <header>Зарегистрироваться</header>
        </div>

        <form @submit.prevent="handleSubmit" id="registrationForm">
          <div class="field">
            <label for="username">Имя пользователя</label>
            <input type="text" v-model="username" id="username" placeholder="Имя пользователя" />
          </div>

          <div class="field">
            <label for="email">Электронная почта</label>
            <input type="email" v-model="email" id="email" placeholder="Электронная почта" />
          </div>

          <div class="field">
            <label for="telephone">Номер телефона</label>
            <input type="tel" v-model="telephone" id="telephone" placeholder="Номер телефона" />
          </div>

          <div class="field">
            <label for="password">Пароль</label>
            <input type="password" v-model="password" id="password" placeholder="Пароль" />
          </div>

          <div class="field button-field">
            <button type="submit">Зарегистрироваться</button>
          </div>
        </form>
      </div>

      <div class="form-errors" v-if="errors.length">
        <div class="error-field" v-for="(error, index) in errors" :key="index">
          <div class="error-message">{{ error }}</div>
        </div>
      </div>

      <div class="social-media">
        <a :href="googleLoginUrl">Войти с помощью Google</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      telephone: '',
      password: '',
      errors: [],
    };
  },
  computed: {
    googleLoginUrl() {
      return '/auth/google/';
    },
  },
  methods: {
    handleSubmit() {
      this.errors = [];
      const registrationData = {
        username: this.username,
        email: this.email,
        telephone: this.telephone,
        password: this.password,
      };
    },
  },
};
</script>

<style scoped>
.authentication {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e0f7fa;
}

.main-header__logo img {
  max-width: 200px;
}

.form-content {
  width: 300px;
  margin: 20px 0;
}

.field {
  margin-bottom: 15px;
}

.social-media {
  margin-top: 20px;
}

.form-errors {
  color: red;
  margin-top: 10px;
}
</style>
