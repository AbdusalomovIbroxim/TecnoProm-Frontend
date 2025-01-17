<template>
  <div>
    <NavBar />
    <FooterSection />
  </div>
</template>

<script>
import NavBar from '@/components/default/NavBar.vue';
import FooterSection from '@/components/default/Footer.vue';

export default {
  components: {
    NavBar,
    FooterSection,
  },
  data() {
    return {
      product: {},
      isFavorite: false,
      authorProducts: [],
      similarProducts: [],
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>