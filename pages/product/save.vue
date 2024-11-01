<template>
    <div class="order-placement">
      <h1>Размещение заказа</h1>
      <OrderForm /> <!-- Вызов компонента формы -->
    </div>
  </template>
  
  <script>
  import OrderForm from '@/components/homePage/Form.vue';
  
  export default {
    components: {
      OrderForm,
    },
  };
  </script>
  
  <style scoped>
  /* Ваши стили для страницы размещения заказа */
  </style>
  