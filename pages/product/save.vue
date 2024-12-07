<template>
  <div class="order-placement">
    <NavBar />
    <h1>Размещение заказа</h1>
    <OrderForm />
  </div>
</template>

<style>
@import '@/assets/css/styles.css';
</style>
  
<script>
import NavBar from '@/components/NavBar.vue';
import OrderForm from '@/components/homePage/Form.vue';

export default {
  components: {
    OrderForm,
    NavBar,
  },
};
</script>

  