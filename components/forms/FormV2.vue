<template>
  <div class="form-container">
    <h1 class="form-title">Форма</h1>
    <form @submit.prevent="handleSubmit" class="" style="display: flex; flex-direction: column;">
        <div class="form-grid">
          <!-- Первый столбец -->
          <div class="form-column">
            <div class="form-group">
              <label for="title">Заголовок:</label>
              <input type="text" v-model="formData.title" id="title" class="form-input" required />
            </div>

            <div class="form-group">
              <label for="description">Описание:</label>
              <textarea v-model="formData.description" id="description" class="form-textarea" required></textarea>
            </div>

            <div class="form-group">
              <label for="phone_number">Телефон:</label>
              <input
                type="tel"
                v-model="formData.phone_number"
                id="phone_number"
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
          </div>

          <!-- Второй столбец -->
          <div class="form-column">
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
          </div>
        </div>
      <div class="form-submit">
        <button type="submit" class="submit-button">Отправить</button>
      </div>  
    </form>

    <div v-if="getFormStatus === 'success'" class="status-message success">Данные успешно отправлены!</div>
    <div v-if="getFormStatus === 'error'" class="status-message error">Произошла ошибка при отправке данных.</div>
  </div>
</template>

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

    async handleSubmit() {
      const data = {
        type: this.formData.type,
        title: this.formData.title,
        description: this.formData.description,
        phone_number: this.formData.phone_number,
        telegram: this.formData.telegram,
        country: this.selectedCountry,
        city: this.selectedCity,
        category: this.selectedCategory,
        subcategories: this.selectedSubcategories,
        tags: this.selectedTags,
      };

      await this.submitForm(data);

    },

    resetSubcategoriesAndTags() {
      this.subcategories = [];
      this.selectedSubcategories = [];
      this.tags = [];
      this.selectedTags = [];
    },

    async updatePhoneCode() {
      const country = countryCodes.find((c) => c.id === this.selectedCountry);
      this.phonePlaceholder = country ? country.country_code : '';
    },
  },

  watch: {
    selectedCategory(newCategoryId) {
      this.resetSubcategoriesAndTags();
      if (newCategoryId) {
        this.fetchSubcategories(newCategoryId)
          .then((subcategories) => {
            
            this.subcategories = subcategories || [];
          })
          .catch((error) => {
            console.error('Ошибка при загрузке подкатегорий:', error);
          });
      }
    },

    selectedSubcategories(newSubcategories) {
      if (newSubcategories.length > 0) {
        const params = {
          categoryId: this.selectedCategory,
          subcategoryIds: newSubcategories,
        };
        this.fetchTags(params).then((tags) => {
          this.tags = tags || [];
        }).catch((error) => {
          console.error('Error fetching tags:', error);
        });
      }
    },


    selectedCountry(newCountry) {
      this.selectedCity = null;
      if (newCountry) {
        this.fetchCities({ countryId: newCountry });
        this.updatePhoneCode();
      }
    },
  },

  async mounted() {
    await Promise.all([this.fetchCategories(), this.fetchCountries()]);
  },
};
</script>




<style scoped>
@import url('@/assets/css/styles.css');
@import url('@/assets/css/form.css');

.form-container {
  max-width: 800px;
  margin: 0 auto;
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
}

.form-grid {
  display: flex;
  gap: 20px;
}

.form-columns {
  width: 100%;
  display: flex;
  gap: 15px;
  min-height: 600px;
  max-height: 900px;
}

.form-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-input,
.form-select,
.form-textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  resize: none;
}

.cat {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.cat-item {
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid #ccc;

}

.cat-item label {
  margin: 0;
}
</style>