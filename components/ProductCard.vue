<template>
  <div :class="`card__${product.type} card-color`">
    <div class="card__buy-content">
      <div class="card__sell-image">
        <img :src="product.image_set[0].image.url" alt="Product Image" />
      </div>
      <a :href="`/product-detail/${product.slug}`" class="title">{{ product.title }}</a>
      <div class="product-data">
        <div class="category-info">
          <div class="product-cat__image">
            <img src="/static/product/images/categories/1.svg" alt="cat image" />
          </div>
          <a href="#">{{ product.category }}</a>
        </div>
        <div class="flags">
          <span class="country">{{ product.country }}</span>
        </div>
        <div class="date">
          <span class="full-date">{{ product.create_date }}</span>
        </div>
        <div class="like-and-more">
          <a :href="`/product-detail/${product.slug}`" class="read-more">Подробнее</a>
          <div class="svg-icon-container">
            <span class="add-to-favorites" :data-product-id="product.id" :data-url="`/add_to_favorites/${product.id}`">
              <i :class="`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`" style="font-size: 15px"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
