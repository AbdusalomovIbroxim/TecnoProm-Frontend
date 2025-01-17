<!-- filepath: /c:/Frontt/my-nuxt-project/pages/product/save.vue -->
<template>
    <div class="container">
        <NavBar></NavBar>
        <FormV2 ref="formV2" />
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/default/NavBar.vue';
  import FormV2 from '@/components/forms/FormV2.vue';
  
  export default {
    components: {
        NavBar,
        FormV2,
    },
    methods: {
      handleSubmit() {
        // this.$refs.formV2.handleSubmit();
      },
    },
  };
  </script>