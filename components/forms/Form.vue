<template>
    <div class="form-container">
      <h1 class="form-title">Форма</h1>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Заголовок:</label>
          <input type="text" v-model="formData.title" id="title" class="form-input" required />
        </div>

        <div class="form-group">
          <label for="description">Описание:</label>
          <textarea v-model="formData.description" id="description" class="form-textarea" required></textarea>
        </div>

        <div class="form-group">
          <label for="category">Категория:</label>
          <select v-model="selectedCategory" id="category" class="form-select" @change="resetSubcategoriesAndTags">
            <option value="" disabled>Выберите категорию</option>
            <option v-for="category in getCategories" :key="category.id" :value="category.id">
              {{ category.name_uz }}
            </option>
          </select>
        </div>

        <div v-if="subcategories.length" class="form-group">
          <label>Подкатегории:</label>
          <div class="cat">
            <div v-for="subcategory in subcategories" :key="subcategory.id" class="cat-item">
              <label>
                <input type="checkbox" :value="subcategory.id" v-model="selectedSubcategories" class="form-checkbox" />
                <span>{{ subcategory.name_uz }}</span>
              </label>
            </div>
          </div>
        </div>

        <div v-if="selectedSubcategories.length && tags.length" class="form-group">
          <label>Теги:</label>
          <div class="cat">
            <div v-for="tag in tags" :key="tag.id" class="cat-item">
              <label>
                <input type="checkbox" :value="tag.id" v-model="selectedTags" class="form-checkbox" />
                <span>{{ tag.name_uz }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="country">Страна:</label>
          <select v-model="selectedCountry" id="country" class="form-select" @change="updatePhoneCode">
            <option value="" disabled>Выберите страну</option>
            <option v-for="country in getCountries" :key="country.id" :value="country.id">
              {{ country.name_uz }}
            </option>
          </select>
        </div>

        <div v-if="selectedCountry === 1 && getCities.length" class="form-group">
          <label for="city">Город:</label>
          <select v-model="selectedCity" id="city" class="form-select">
            <option value="" disabled>Выберите город</option>
            <option v-for="city in getCities" :key="city.id" :value="city.id">
              {{ city.name_uz }}
            </option>
          </select>
        </div>



        <div class="form-group">
          <label for="phone_number">Телефон:</label>
          <input
            type="tel"
            v-model="formData.phone_number"
            id="phone"
            class="form-input"
            :placeholder="phonePlaceholder"
            required
            pattern="^\+?[0-9\s]+$"
            inputmode="numeric"
          />
        </div>

        <div class="form-group">
          <label for="telegram">Telegram:</label>
          <input type="text" v-model="formData.telegram" id="telegram" class="form-input" />
        </div>

        <button type="submit" class="submit-button">Отправить</button>
      </form>

    </div>
</template>


<style scoped>

@import url('@/assets/css/styles.css');
@import url('@/assets/css/form.css');

</style>

<script>
import { mapGetters, mapActions } from 'vuex';
import countryCodes from '../../countryCodes.json';

export default {
  data() {
  return {
    formData: {
      type: 'buy',
      title: '',
      description: '',
      phone_number: '',
      telegram: '',
    },
    selectedCategory: null,
    selectedSubcategories: [],
    selectedCountry: null,
    selectedCity: null,
    selectedTags: [],
    subcategories: [],
    tags: [],
    phonePlaceholder: '',
  };
},


  computed: {
    ...mapGetters([
      'getCategories',
      'getCountries',
      'getCities',
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

    async handleSubmit() {
      const formData = new FormData();
        formData.append('type', 'buy');
        formData.append('title', this.formData.title);
        formData.append('description', this.formData.description);
        formData.append('phone_number', this.formData.phone_number);
        formData.append('telegram', this.formData.telegram);
        formData.append('country_code', this.getCountryCode());
        formData.append('category', this.selectedCategory);

        this.selectedSubcategories.forEach((subcategory) => {
          formData.append('subcategories[]', subcategory);
        });

        this.selectedTags.forEach((tag) => {
          formData.append('tags[]', tag);
        });
        formData.append('country', this.selectedCountry);
        formData.append('city', this.selectedCity);
        
        await this.submitForm(formData);
    },

    handleImageUpload(event) {
      this.selectedImages = event.target.files;
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

      if (newCountry === 1) {
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