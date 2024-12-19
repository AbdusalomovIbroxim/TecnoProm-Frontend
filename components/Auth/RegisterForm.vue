<!-- /components/Auth/RegisterForm.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <div class="field input-field">
      <input
        type="text"
        v-model="telephone"
        placeholder="Номер телефона"
        required
      />
    </div>
    <div class="field input-field">
      <input
        :type="passwordFieldType"
        v-model="password"
        placeholder="Пароль"
        required
        minlength="6"
      />
      <div class="eye-icon" @click="togglePassword">
        <i :class="passwordIconClass"></i>
      </div>
    </div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div class="field button-field">
      <button type="submit">Зарегистрироваться</button>
    </div>
  </form>
</template>

<script>
import { register } from "../../api/auth";
import togglePasswordMixin from "@/mixins/togglePasswordMixin";

export default {
  mixins: [togglePasswordMixin],

  data() {
    return {
      telephone: "",
      password: "",
      errorMessage: "",
    };
  },

  methods: {
    async handleSubmit() {
      try {
        const response = await register(this.telephone, this.password);

        if (response.status === 200) {
          localStorage.setItem('telephone', this.telephone);
          this.$emit('registerSuccess');
        } else {
          this.errorMessage = response.message || "Ошибка регистрации";
        }
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Ошибка соединения с сервером";
      }
    },
  },
};
</script>