<template>
  <div class="form-container">
    <h1>Форма</h1>

    <form @submit.prevent="submitForm">
      <input type="hidden" name="type" value="buy">
      <!-- Заголовок -->
      <div>
        <label for="title">Заголовок:</label>
        <input type="text" v-model="formData.title" id="title" required />
      </div>

      <!-- Описание -->
      <div>
        <label for="description">Описание:</label>
        <textarea v-model="formData.description" id="description" required></textarea>
      </div>

      <!-- Категория -->
      <div>
        <label for="category">Категория:</label>
        <select v-model="selectedCategory" id="category" @change="resetSubcategoriesAndTags">
          <option value="" disabled>Выберите категорию</option>
          <option v-for="category in getCategories" :key="category.id" :value="category.id">
            {{ category.name_uz }}
          </option>
        </select>
      </div>

      <!-- Подкатегории -->
      <div v-if="subcategories.length">
        <label>Подкатегории:</label>
        <div class="cat">
          <div v-for="subcategory in subcategories" :key="subcategory.id">
            <label>
              <input type="checkbox" :value="subcategory.id" v-model="selectedSubcategories" />
              <span>{{ subcategory.name_uz }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Теги, выводимые только после выбора подкатегории -->
      <div v-if="selectedSubcategories.length && tags.length">
        <label>Теги:</label>
        <div class="cat">
          <div v-for="tag in tags" :key="tag.id">
            <label>
              <input type="checkbox" :value="tag.id" v-model="selectedTags" />
              <span>{{ tag.name_uz }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Страны -->
      <div>
        <label for="country">Страна:</label>
        <select v-model="selectedCountry" id="country" @change="updatePhoneCode">
          <option value="" disabled>Выберите страну</option>
          <option v-for="country in getCountries" :key="country.id" :value="country.slug">
            {{ country.name_uz }}
          </option>
        </select>
      </div>

      <!-- Города -->
      <div v-if="selectedCountry === 'uzbekistan' && getCities.length">
        <label for="city">Город:</label>
        <select v-model="selectedCity" id="city">
          <option value="" disabled>Выберите город</option>
          <option v-for="city in getCities" :key="city.id" :value="city.slug">
            {{ city.name_uz }}
          </option>
        </select>
      </div>

      <!-- Телефон -->
      <div>
        <label for="phone">Телефон:</label>
        <input 
          type="tel" 
          v-model="formData.phone" 
          id="phone" 
          :placeholder="phonePlaceholder" 
          required 
          pattern="[0-9]*" 
          inputmode="numeric" 
        />
      </div>

      <!-- Telegram -->
      <div>
        <label for="telegram">Telegram:</label>
        <input type="text" v-model="formData.telegram" id="telegram" />
      </div>

      <!-- Кнопка отправки -->
      <button type="submit">Отправить</button>
    </form>

    <!-- Уведомление о статусе формы -->
    <div v-if="getFormStatus === 'success'">Данные успешно отправлены!</div>
    <div v-if="getFormStatus === 'error'">Произошла ошибка при отправке данных.</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import countryCodes from '../../countryCodes.json';

export default {
  data() {
    return {
      formData: {
        title: '',
        description: '',
        phone: '',
        telegram: '',
      },
      selectedCategory: null,
      selectedSubcategories: [],
      selectedCountry: null,
      selectedCity: null,
      selectedTags: [],
      subcategories: [],
      tags: [],
      phonePlaceholder: '', // Для хранения кода страны
    };
  },

  computed: {
    ...mapGetters([
      'getCategories',
      'getCountries',
      'getCities',
      'getFormStatus',
    ]),
  },

  methods: {
    ...mapActions([
      'fetchCategories',
      'fetchCountries',
      'fetchCities',
      'submitForm',
      'fetchSubcategories',
      'fetchTags',
    ]),

    async submitForm() {
      const formData = {
        title: this.formData.title,
        description: this.formData.description,
        phone: this.formData.phone,
        telegram: this.formData.telegram,
        country_code: this.getCountryCode(), // Получаем код страны
        category: this.selectedCategory,
        subcategories: this.selectedSubcategories,
        country: this.selectedCountry,
        city: this.selectedCity,
        tags: this.selectedTags,
      };
      await this.submitForm(formData);
    },

    getCountryCode() {
      const country = countryCodes.find(c => c.slug === this.selectedCountry);
      return country ? country.country_code : '';
    },

    resetSubcategoriesAndTags() {
      this.subcategories = [];
      this.selectedSubcategories = [];
      this.selectedTags = [];
      this.tags = [];
    },

    updatePhoneCode() {
      this.phonePlaceholder = this.getCountryCode();
      this.formData.phone = `${this.phonePlaceholder} `;
    },
  },

  watch: {
    selectedCategory(newCategory) {
      this.resetSubcategoriesAndTags();
      if (newCategory) {
        this.fetchSubcategories(newCategory).then((data) => {
          this.subcategories = data || [];
        });
      }
    },

    selectedSubcategories(newSubcategories) {
      this.tags = [];
      this.selectedTags = [];
      if (newSubcategories.length > 0) {
        const params = {
          category_id: this.selectedCategory,
          subcategory_ids: newSubcategories,
        };
        this.fetchTags(params).then((data) => {
          this.tags = data || [];
        });
      }
    },

    selectedCountry(newCountry) {
      this.selectedCity = null;
      if (newCountry === 'uzbekistan') {
        this.fetchCities();
      }
      this.updatePhoneCode();
    },
  },

  async mounted() {
    await Promise.all([
      this.fetchCategories(),
      this.fetchCountries(),
    ]);
  },
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
h1 {
  text-align: center;
}
label {
  display: block;
  margin-bottom: 5px;
}
input,
textarea,
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.cat label {
  position: relative;
  margin-bottom: 10px;
}
.cat label input {
  position: absolute;
  display: none;
}
.cat label input + span {
  color: #6f6f6f;
}
.cat label span {
  border: 1px solid #6f6f6f;
  border-radius: 24px;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  padding: 8px 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.cat label input:checked + span {
  background-color: #4caf50;
  color: white;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
