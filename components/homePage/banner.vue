<template>
  <div class="slider">
    <div 
      class="slides" 
      :style="{ transform: `translateX(${-currentIndex * 100}%)`, transition: 'transform 0.5s ease' }"
    >
      <div class="slide" v-for="(slide, index) in slides" :key="index">
        <div class="slider__text">
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.description }}</p>
        </div>
        <div class="slide__img">
          <img :src="slide.img" :alt="'Slide ' + (index + 1)" />
        </div>
      </div>
    </div>
    <!-- <button @click="prevSlide">Previous</button> -->
    <!-- <button @click="nextSlide">Next</button> -->
  </div>
</template>



<script>
export default {
  data() {
    return {
      currentIndex: 0,
      slides: [
        { img: require('@/static/images/banners/banner-ishlatilgan-uskuna.svg'), description: 'Современные технологии помогают эффективно использовать оборудование для бизнеса.', title: 'Использованное оборудование' },
        { img: require('@/static/images/banners/banner-texnolog.svg'), description: 'Передовые технологии открывают новые горизонты для инноваций и роста.', title: 'Новые технологии' },
        { img: require('@/static/images/banners/banner-xizmat-korsatish.svg'), description: 'Профессиональные услуги для поддержки вашего бизнеса на высшем уровне.', title: 'Качественное обслуживание' },
        { img: require('@/static/images/banners/banner-xom-ashyo.svg'), description: 'Надежные источники сырья – основа успешного производства.', title: 'Сырьё высокого качества' },
        { img: require('@/static/images/banners/banner-yangi-uskuna.svg'), description: 'Инновационное оборудование для эффективного и безопасного производства.', title: 'Новейшее оборудование' }
      ]
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    }
  },
  mounted() {
    setInterval(this.nextSlide, 3000);
  }
};
</script>

<style scoped>
.slider {
  margin: auto;
  overflow: hidden;
  position: relative;
}

.slides {
  display: flex;
  transition: transform 0.5s ease;
}

.slide {
  min-width: 100%;
  height: 90vh;
  display: flex;
  gap: 20%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #0a24b9;
}

.slider__text,
.slide__img {
  width: 30%;
}

.slider__text {
  color: white;
}

.slide__img img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
