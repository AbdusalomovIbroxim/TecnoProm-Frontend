// /mixins/togglePasswordMixin.js
export default {
    data() {
      return {
        passwordFieldType: 'password',
      };
    },
    computed: {
      passwordIconClass() {
        return this.passwordFieldType === 'password' ? 'fa-regular fa-eye-slash' : 'fa-solid fa-eye';
      },
    },
    methods: {
      togglePassword() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      },
    },
  };
  