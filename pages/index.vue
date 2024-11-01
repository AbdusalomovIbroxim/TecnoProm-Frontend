<style >
@import url('../assets/css/styles.css');
</style>

<template>
  <div>
    <NavBar />
    <banner />
    <!-- <ItemsList /> -->
    <Form />
    <!-- <Cards></Cards> -->
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';
import ItemsList from '~/components/ItemsList.vue';
import banner from '~/components/homePage/banner.vue';
import Form from '~/components/homePage/Form.vue';
// import Cards from '~/components/Cards.vue';

export default {
  components: {
    NavBar,
    ItemsList,
    banner,
    Form,
    // Cards,

  },
};
</script>
