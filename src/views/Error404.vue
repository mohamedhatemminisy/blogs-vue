<template>
  <Header />

  <div class="error">
    <div class="container">
      <div class="text-center mx-auto">
        <h2>404</h2>
        <p class="lead text-gray-800 mb-4">صفحة غير موجودة</p>
        <router-link class="btn back" :to="{ name: 'Home' }">العودة إلى الرئيسية ←</router-link>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/global/Header.vue";
import Footer from "@/components/global/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
      watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || "صفحة غير موجودة";
      },
    },
  },
};

</script>

<style>
</style>