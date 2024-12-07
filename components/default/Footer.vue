<template>
  <footer class="footer">
    <div class="footer__container">
      <!-- 1. Лого, текст и категории -->
      <div class="footer__column">
        <div class="footer__logo">
          <img src="~/static/images/TECNOPROM-LOGO.png" alt="Logo" class="logo" />
        </div>
        <p>Яккасарой 11. Ташкент. Узбекистан.<br>© 2023 Технопром. Все права защищены.</p>
        <ul class="footer__list">
          <li v-for="(item, index) in equipmentCategories" :key="index">
            <a href="#">{{ item }}</a>
          </li>
        </ul>
      </div>

      <!-- 2. Telegram Channels -->
      <div class="footer__column">
        <h3 class="footer__column-title">Telegram Channels</h3>
        <ul class="footer__list">
          <li v-for="(item, index) in telegramChannels" :key="index">
            <a href="#">{{ item }}</a>
          </li>
        </ul>
      </div>

      <!-- 3. Telegram Groups -->
      <div class="footer__column">
        <h3 class="footer__column-title">Telegram Groups</h3>
        <ul class="footer__list">
          <li v-for="(item, index) in telegramGroups" :key="index">
            <a href="#">{{ item }}</a>
          </li>
        </ul>
      </div>

      <!-- 4. Social Media -->
      <div class="footer__column">
        <h3 class="footer__column-title">Social Media</h3>
        <ul class="footer__social-list">
          <li v-for="(social, index) in socialMediaLinks" :key="index">
            <a :href="social.link" target="_blank" class="footer__social-link">
              <i :class="social.icon"></i> {{ social.name }}
            </a>
          </li>
        </ul>
        <div id="wcb" class="carbonbadge wcb-d"></div>
      </div>
    </div>
    <script src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js" defer></script>
  </footer>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.min.css';

export default {
  name: "Footer",
  data() {
    return {
      equipmentCategories: [
        "New equipment",
        "Used equipment",
        "Raw materials",
        "Service",
        "Technologist",
        "Secondary raw materials",
      ],
      telegramChannels: ["About us", "LeMachine.uz", "Raw materials"],
      telegramGroups: ["New equipment", "Used equipment", "Raw materials", "Technologist"],
      socialMediaLinks: [
        { name: "Instagram", link: "https://instagram.com", icon: "fab fa-instagram" },
        { name: "YouTube", link: "https://youtube.com", icon: "fab fa-youtube" },
        { name: "LinkedIn", link: "https://linkedin.com", icon: "fab fa-linkedin" },
        { name: "Facebook", link: "https://facebook.com", icon: "fab fa-facebook" },
      ],
    };
  },
};
</script>

<style scoped>
.footer {
  background-color: #cedae97d;
  color: #000;
  padding: 40px 20px;
  font-size: 14px;
  position: relative;
  padding-top: 150px;
}

.footer::before {
    content: "";
    position: absolute;
    width: 110%;
    height: 100px;
    border-bottom-left-radius: 50% 40px;
    border-bottom-right-radius: 50% 40px;
    background: #fff;
    top: 0px;
    left: -10%;
}

.footer__container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer__logo img {
  width: 100%;
  margin-bottom: 10px;
}

.footer__column-title {
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
}

.footer__list,
.footer__social-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__list li,
.footer__social-list li {
  margin-bottom: 8px;
}

.footer__list a,
.footer__social-link {
  color: #000;
  text-decoration: none;
}

.footer__list a:hover,
.footer__social-link:hover {
  text-decoration: underline;
}

.footer__social-link {
  display: flex;
  align-items: center;
}

.footer__social-link i {
  margin-right: 8px;
  font-size: 18px;
}
</style>
