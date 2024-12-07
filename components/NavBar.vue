<template>
  <header>
    <div class="container">
      <nav class="navbar">
        <!-- Левая часть навбара -->
        <div class="navbar-left">
          <!-- Промышленность с dropdown -->
          <div class="dropdown">
            <a href="#" class="no-underline nav-link" @click.prevent="toggleDropdown('industryDropdown')">Промышленность</a>
            <ul v-if="dropdowns.industryDropdown" class="dropdown-menu">
              <li><a href="/baraholka" class="no-underline dropdown-item">Металлургия</a></li>
              <li><a href="#" class="no-underline dropdown-item">Машиностроение</a></li>
              <li><a href="#" class="no-underline dropdown-item">Химическая промышленность</a></li>
            </ul>
          </div>

          <!-- Направление с dropdown -->
          <div class="dropdown">
            <a href="#" class="no-underline nav-link" @click.prevent="toggleDropdown('directionDropdown')">Направление</a>
            <ul v-if="dropdowns.directionDropdown" class="dropdown-menu">
              <li><a href="#" class="no-underline dropdown-item">Технологии</a></li>
              <li><a href="#" class="no-underline dropdown-item">Энергетика</a></li>
              <li><a href="#" class="no-underline dropdown-item">Экология</a></li>
            </ul>
          </div>
        </div>

        <!-- Логотип -->
        <div class="navbar-logo">
          <a href="/" class="logo">
            <img src="../static/images/TECNOPROM-LOGO.png" alt="Логотип">
          </a>
        </div>

        <!-- Правая часть навбара -->
        <div class="navbar-right">
          <template v-if="isAuthenticated">
            <!-- Кнопка Профиль -->
            <router-link to="/profile" class="no-underline nav-link">Профиль</router-link>
          </template>
          <template v-else>
            <!-- Кнопка Войти -->
            <router-link to="/auth/login/" class="no-underline nav-link">Войти</router-link>
          </template>
          
          <!-- Кнопка Размещение заказа -->
          <a href="product/save/" class="no-underline nav-link">Размещение заказа</a>

          <!-- Dropdown для языка -->
          <div class="dropdown">
            <button @click="toggleDropdown('languageDropdown')" class="dropdown-button">
              Язык
              <span v-if="!dropdowns.languageDropdown">▼</span>
              <span v-else>▲</span>
            </button>
            <ul v-if="dropdowns.languageDropdown" class="dropdown-menu">
              <li><a href="" class="no-underline dropdown-item">Русский</a></li>
              <li><a href="" class="no-underline dropdown-item">English</a></li>
              <li><a href="" class="no-underline dropdown-item">O`zbekcha</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    isAuthenticated: {
      type: Boolean,
      required: true,
    },
  },
  
  data() {
    return {
      dropdowns: {
        industryDropdown: false,
        directionDropdown: false,
        languageDropdown: false,
      },
    };
  },

  methods: {
    toggleDropdown(dropdown) {
      for (let key in this.dropdowns) {
        if (key !== dropdown) {
          this.dropdowns[key] = false;
        }
      }
      this.dropdowns[dropdown] = !this.dropdowns[dropdown];
    },
  },
};
</script>
