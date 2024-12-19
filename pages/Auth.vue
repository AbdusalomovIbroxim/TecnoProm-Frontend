<template>
  <div class="container">
    <div class="logo-container">
      <a href="/">
        <img src="@/static/images/TECNOPROM-LOGO.png" alt="logo" />
      </a>
    </div>
    <div class="form-container">
      <div class="form-content">
        <LoginForm v-if="currentForm === 'login'" @loginSuccess="showOTPForm" />
        <RegisterForm v-if="currentForm === 'register'" />
        <OTPForm v-if="currentForm === 'otp'" @otpVerified="handleOTPVerified" />
        <div class="form-toggle" v-if="currentForm !== 'otp'">
          <p>
            {{ currentForm === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
            <a @click="toggleForm">
              {{ currentForm === 'login' ? 'Зарегистрироваться' : 'Войти' }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/Auth/LoginForm.vue";
import RegisterForm from "@/components/Auth/RegisterForm.vue";
import OTPForm from "@/components/Auth/OTPForm.vue";

export default {
  components: {
    LoginForm,
    RegisterForm,
    OTPForm,
  },
  data() {
    return {
      currentForm: 'login',
    };
  },
  methods: {
    toggleForm() {
      this.currentForm = this.currentForm === 'login' ? 'register' : 'login';
    },
    showOTPForm() {
      this.currentForm = 'otp';
    },
    handleOTPVerified() {
      this.$router.push('/');
    },
  },
};
</script>

<style>
@import url('@/assets/css/auth.css');
</style>