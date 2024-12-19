<!-- /components/Auth/OTPForm.vue -->
<template>
  <form @submit.prevent="handleOTPVerification">
    <div class="field input-field">
      <input 
        type="text" 
        v-model="otp" 
        placeholder="Введите код из SMS" 
        maxlength="6"
        required
      />
    </div>
    <div class="field button-field">
      <button type="submit">Подтвердить</button>
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </form>
</template>

<script>
import { verify_phone } from "../../api/auth";

export default {
  data() {
    return {
      otp: "",
      error: "",
    };
  },
  methods: {
    async handleOTPVerification() {
      try {
        this.error = "";
        const telephone = localStorage.getItem('telephone');
        const response = await verify_phone(telephone, this.otp);
        if (response.status === 200) {
          window.location.href = '/';
        } else {
          this.error = "Неверный код. Попробуйте ещё раз.";
        }
      } catch (err) {
        console.error("Ошибка при проверке OTP:", err);
        this.error = "Произошла ошибка. Попробуйте позже.";
      }
    },
  },
};
</script>