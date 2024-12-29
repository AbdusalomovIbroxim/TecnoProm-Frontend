<template>
  <header>
    <div class="container">
      <nav class="navbar">
        <div class="navbar-left">
          <div class="dropdown">
            <a
              href="#"
              class="no-underline nav-link"
              @click.prevent="toggleDropdown('industryDropdown')"
            >
              Промышленность
            </a>
            <ul v-if="dropdowns.industryDropdown" class="dropdown-menu">
              <li><a href="/baraholka" class="no-underline dropdown-item">Металлургия</a></li>
              <li><a href="#" class="no-underline dropdown-item">Машиностроение</a></li>
              <li><a href="#" class="no-underline dropdown-item">Химическая промышленность</a></li>
            </ul>
          </div>

          <div class="dropdown">
            <a
              href="#"
              class="no-underline nav-link"
              @click.prevent="toggleDropdown('directionDropdown')"
            >
              Направление
            </a>
            <ul v-if="dropdowns.directionDropdown" class="dropdown-menu">
              <li><a href="#" class="no-underline dropdown-item">Технологии</a></li>
              <li><a href="#" class="no-underline dropdown-item">Энергетика</a></li>
              <li><a href="#" class="no-underline dropdown-item">Экология</a></li>
            </ul>
          </div>
        </div>

        <div class="navbar-logo">
          <a href="/" class="logo">
            <img src="../static/images/TECNOPROM-LOGO.png" alt="Логотип" />
          </a>
        </div>

        <div class="navbar-right">
          <template v-if="isAuthenticated">
            <router-link to="/profile" class="no-underline nav-link">Профиль</router-link>
          </template>
          <template v-else>
            <router-link to="/auth" class="no-underline nav-link">Войти</router-link>
          </template>
          <a href="product/save" class="no-underline nav-link">Размещение заказа</a>

          <div class="dropdown">
            <button @click="toggleDropdown('languageDropdown')" class="dropdown-button">
              Язык
              <span v-if="!dropdowns.languageDropdown">▼</span>
              <span v-else>▲</span>
            </button>
            <ul v-if="dropdowns.languageDropdown" class="dropdown-menu">
              <li><a href="#" class="no-underline dropdown-item">Русский</a></li>
              <li><a href="#" class="no-underline dropdown-item">English</a></li>
              <li><a href="#" class="no-underline dropdown-item">O`zbekcha</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { fetchUser } from "@/api/auth";

export default {
  data() {
    return {
      dropdowns: {
        industryDropdown: false,
        directionDropdown: false,
        languageDropdown: false,
      },
      isAuthenticated: false,
    };
  },
  methods: {
    async checkAuthentication() {
      const accessToken = localStorage.getItem("access_token");
      
      if (accessToken) {
        try {
          const user = await fetchUser();
          if (user) {
            this.isAuthenticated = true;
          }
        } catch (error) {
          this.isAuthenticated = false;
        }
      } else {
        this.isAuthenticated = false;
      }
    },
    toggleDropdown(dropdown) {
      Object.keys(this.dropdowns).forEach((key) => {
        if (key !== dropdown) {
          this.dropdowns[key] = false;
        }
      });
      this.dropdowns[dropdown] = !this.dropdowns[dropdown];
    },
    closeDropdowns() {
      Object.keys(this.dropdowns).forEach((key) => {
        this.dropdowns[key] = false;
      });
    },
    handleOutsideClick(event) {
      if (!event.target.closest(".dropdown")) {
        this.closeDropdowns();
      }
    },
  },
  async mounted() {
    document.addEventListener("click", this.handleOutsideClick);
    await this.checkAuthentication();
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
};
</script>

<style>
@import url('../assets/css/styles.css');
</style>
