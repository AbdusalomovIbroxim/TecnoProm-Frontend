<template>
  <div>
    <NavBar/>
    <banner />
    <FormV2 />
    <Cards />
    <Card2 />
    <Footer />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';
import Footer from '~/components/default/Footer.vue';
import banner from '~/components/homePage/banner.vue';
import FormV2 from '~/components/homePage/FormV2.vue';
import Cards from '~/components/Cards.vue';
import Card2 from '~/components/Card2.vue';

export default {
  components: {
    NavBar,
    Footer,
    banner,
    FormV2,
    Cards,
    Card2,
  },
};
</script>

<style>
@import url('../assets/css/styles.css');
</style>