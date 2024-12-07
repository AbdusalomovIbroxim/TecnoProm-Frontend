<template>
  <div class="container">
    <div class="logo-container">
      <a href="/">
        <img src="@/static/images/TECNOPROM-LOGO.png" alt="logo" />
      </a>
    </div>
    
    <div class="form-container">
      <!-- <div v-if="authFormStatus === 'success'" class="success-message">
        Вы успешно вошли!
      </div>
      <div v-if="authFormStatus === 'error'" class="error-message">
        Ошибка входа. Проверьте данные.
      </div> -->

      <div class="form-content">
        <form @submit.prevent="handleSubmit">
          <div class="field input-field">
            <input type="text" v-model="username" placeholder="Номер телефона" />
          </div>
          <div class="field input-field">
            <input type="password" v-model="password" placeholder="Пароль" />
            <div class="eye-icon" @click="togglePassword">
              <i :class="passwordIconClass"></i>
            </div>
          </div>
          <div class="form-link">
            <a href="#" class="forgot-password">Забыли пароль?</a>
          </div>
          <div class="field button-field">
            <button type="submit">Войти</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";


export default {
  data() {
    return {
      username: '',
      password: '',
      passwordFieldType: 'password',
    };
  },
  computed: {
    ...mapGetters(["authFormStatus"]),

    passwordIconClass() {
      return this.passwordFieldType === 'password' ? 'fa-regular fa-eye-slash' : 'fa-solid fa-eye';
    },
  },
  methods: {
    ...mapActions(["loginUser"]),

    async handleSubmit() {
      const credentials = {
        username: this.username,
        password: this.password,
      };

      await this.$store.dispatch('loginUser', credentials);

      if (this.authFormStatus === 'success') {
        window.location.href = '/'
        // this.$router.push('/');
      }
    },
    togglePassword() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
  },
};
</script>


<style >
@import url('@/assets/css/styles.css');
@import url('@/assets/css/auth.css');
</style>