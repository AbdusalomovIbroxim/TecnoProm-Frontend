<!-- /components/Auth/LoginForm.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <div class="field input-field">
      <input type="text" v-model="telephone" placeholder="Номер телефона" />
    </div>
    <div class="field input-field">
      <input :type="passwordFieldType" v-model="password" placeholder="Пароль" />
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
</template>
  
<script>
import { login } from "../../api/auth";
import togglePasswordMixin from "@/mixins/togglePasswordMixin";  

export default {
  mixins: [togglePasswordMixin],
  data() {
    return {
      telephone: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit() {
    
      const log = await login(this.telephone, this.password);
      
      if (log === 200) {
        console.log(log);
        
        localStorage.setItem('telephone', this.telephone);
        this.$emit('loginSuccess');
      }
    },
  },
};
</script>

  