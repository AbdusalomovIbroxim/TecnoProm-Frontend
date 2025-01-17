<template>
  <div class="container">
    <div class="logo-container">
      <a href="/">
        <img src="@/static/images/TECNOPROM-LOGO.png" alt="logo" />
      </a>
    </div>

    <div class="form-container">
      <a
        v-if="csrfToken"
        :href="botLink"
        class="telegram-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Authorize via Telegram
      </a>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<script>
import { saveCSRFToken, checkAuthStatus } from '@/api/auth';

export default {
  data() {
    return {
      botUsername: 'mindsyync_bot',
      csrfToken: null,
      intervalId: null,
    };
  },

  computed: {
    botLink() {
      return this.csrfToken ? `https://t.me/${this.botUsername}?start=${this.csrfToken}` : '';
    },
  },

  async created() {
    if (process.client) {
      await this.fetchCsrfToken();
      this.startAuthCheck();
    }
  },

  methods: {
    async fetchCsrfToken() {
      try {
        this.csrfToken = await saveCSRFToken(); // Save CSRF token and store it
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    },

    async checkAuthStatusPeriodically() {
      try {
        const status = await checkAuthStatus(); // Check authentication status
        if (status === 200) {
          this.$router.push('/profile'); // Redirect to profile if authenticated
          clearInterval(this.intervalId); // Stop the periodic check once authenticated
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
      }
    },

    startAuthCheck() {
      this.intervalId = setInterval(this.checkAuthStatusPeriodically, 2000); // Check every 2 seconds
    },
  },

  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clean up the interval when the component is destroyed
    }
  },
};
</script>

<style scoped>
@import url('@/assets/css/styles.css');
@import url('@/assets/css/auth.css');

.telegram-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #0088cc;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.telegram-link:hover {
  background-color: #0077b5;
}
</style>
