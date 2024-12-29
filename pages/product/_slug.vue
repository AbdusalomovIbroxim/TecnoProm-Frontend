<template>
  <div>
    <HeaderSection />
    <div class="container">
      <section class="product-details" style="padding-bottom: 50px">
        <div class="product-detail">
          <div class="product-foto-and-info">
            <ProductPhoto :product="product" />
            <ProductDescription :product="product" />
            <ContactSeller :product="product" />
          </div>
          <ListingInfo :product="product" :isFavorite="isFavorite" />
        </div>
        <AuthorProducts :authorProducts="authorProducts" />
        <SimilarProducts :similarProducts="similarProducts" />
      </section>
    </div>
    <FooterSection />
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue';
import FooterSection from '@/components/FooterSection.vue';
import ProductPhoto from '@/components/ProductPhoto.vue';
import ProductDescription from '@/components/ProductDescription.vue';
import ContactSeller from '@/components/ContactSeller.vue';
import ListingInfo from '@/components/ListingInfo.vue';
import AuthorProducts from '@/components/AuthorProducts.vue';
import SimilarProducts from '@/components/SimilarProducts.vue';

export default {
  components: {
    HeaderSection,
    FooterSection,
    ProductPhoto,
    ProductDescription,
    ContactSeller,
    ListingInfo,
    AuthorProducts,
    SimilarProducts,
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
