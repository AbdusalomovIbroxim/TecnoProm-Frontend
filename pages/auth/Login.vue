<style>
@import url('@/assets/css/auth.css');
</style>


<template>
  <div class="authentication login">
    <div class="main-header__logo">
      <router-link to="/">
        <img src="@/static/images/TECNOPROM-LOGO.png" alt="logo" />
      </router-link>
    </div>
    <div class="form login">
      <div class="form-content">
        <div class="form-text">
          <header>Войти</header>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="field input-field">
            <input type="text" v-model="username" placeholder="Логин" />
          </div>
          <div class="field input-field">
            <input type="password" v-model="password" placeholder="Пароль" />
            <div class="eye-icon" @click="togglePassword">
              <i :class="passwordIconClass"></i>
            </div>
          </div>
          <div class="form-link">
            <a class="forgot-password">Забыли пароль?</a>
          </div>
          <div class="field button-field">
            <button type="submit">Войти</button>
          </div>
        </form>
      </div>

      <div class="social-media">
        <a :href="googleLoginUrl">
          <img src="@/static/images/icons/icons-google.svg" alt="google icon" />
        </a>
      </div>
    </div>

    <div class="signup-banner">
      <div class="signup" id="for-signup-page">
        <div class="signup-content">
          <img src="@/static/images/banners/banner-ishlatilgan-uskuna.svg" alt="logo" class="signup-logo" />
          <div class="signup-text">
            <p>
              У вас нет учетной записи?
              <a href="/auth/signup/">Зарегистрироваться</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      passwordFieldType: 'password',
    };
  },
  computed: {
    passwordIconClass() {
      return this.passwordFieldType === 'password' ? 'fa-regular fa-eye-slash' : 'fa-solid fa-eye';
    },
    googleLoginUrl() {
      // Здесь можно использовать ваш URL для входа через Google
      return '/auth/google/';
    },
  },
  methods: {
    handleSubmit() {
      // Логика для отправки формы (например, через API)
      console.log('Username:', this.username);
      console.log('Password:', this.password);
      // Здесь можно сделать запрос к серверу для аутентификации
    },
    togglePassword() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
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
  background-color: #e0f7fa; /* Мягкий голубой фон */
}

.main-header__logo img {
  max-width: 200px; /* Примерный размер логотипа */
}

.form-content {
  width: 300px; /* Ширина формы */
  margin: 20px 0;
}

.field {
  margin-bottom: 15px;
}

.input-field {
  position: relative;
}

.eye-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.social-media {
  margin-top: 20px;
}

.signup-banner {
  margin-top: 20px;
}

.signup-content {
  text-align: center;
}
</style>
