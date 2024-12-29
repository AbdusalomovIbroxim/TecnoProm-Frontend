<!-- cardbase.vue -->

<template>
  <div class="card">
    <div v-if="type === 'sell'" class="card__content">
      <div v-if="image" class="card__image">
        <img 
          :src="image" 
          alt="Product Image" 
          style="position: absolute; left: 0; top: 0; max-height: 160px; width: 100%; height: 100%; object-fit: cover;"
        />
      </div>
      
      <p style="padding-top: 145px; display: flex; align-items: center;">
        <img 
          :src="category.icon" 
          alt="Category Icon" 
          style="width: 20px; height: 20px; margin-right: 8px;"
        />
        {{ category.name }}
      </p>
      
      <h1 class="title">
        {{ title }}
      </h1>

      <p v-if="description" class="description">
        {{ description }}
      </p>
    </div>

    <div v-else-if="type === 'buy'" class="card__content">
      <p style="display: flex; align-items: center;">
        <img 
          :src="category.icon" 
          alt="Category Icon" 
          style="width: 20px; height: 20px; margin-right: 8px;"
        />
        {{ category.name }}
      </p>
      <h1 class="title">
        {{ title }} 
      </h1>

      <p v-if="description" class="description">
        {{ description }}
      </p>

    </div>

    <div class="card__footer">
      <div class="product-info">
        <span class="country">{{ country }}</span>
        <span class="date">{{ date }}</span>
      </div>
      <div class="actions">
        <a :href="detailsLink" class="read-more">Подробнее</a>
        <span class="add-to-favorites" @click="$emit('toggle-favorite')">
          <i :class="`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      type: String,
      image: String,
      title: String,
      description: String,
      category: Object,
      country: String,
      date: String,
      detailsLink: String,
      isFavorite: Boolean,

    },
  };
</script>
  