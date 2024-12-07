<style >
@import url('../assets/css/styles.css');
</style>

<template>
  <div>
    <NavBar></NavBar>
    <banner></banner>
    <!-- <Form></Form> -->
    <FormV2></FormV2>
    <Cards></Cards>
    <Card2></Card2>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';
import Footer from "~/components/default/Footer.vue";
import banner from '~/components/homePage/banner.vue';
import Form from '~/components/homePage/Form.vue';
import FormV2 from '~/components/homePage/FormV2.vue';
import Cards from '~/components/Cards.vue';
import Card2 from '~/components/Card2.vue';


export default {
  components: {
    NavBar,
    Footer,
    banner,
    Form,
    FormV2,
    Cards,
    Card2,
  },
};
</script>
