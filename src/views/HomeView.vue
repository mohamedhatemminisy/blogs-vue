<template>
  <div class="loading" v-if="this.$store.state.loading == true">
    <div class="spinner-grow" style="width: 3rem; height: 3rem" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-if="!this.$store.state.loading == true">
  <Header />
  <div class="container">
    <div class="row">
      <Slider :sliders="homeData.slider" />
      <lastNews
        :lastNews="homeData.last_news"
        :announcement="homeData.announcement"
      />
      <lastWeekNews :lastWeekNews="homeData.last_week_news" />
      <Aside />
    </div>
  </div>
  <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/global/Header.vue";
import Footer from "@/components/global/Footer.vue";
import Aside from "@/components/global/Aside.vue";
import Slider from "@/components/home/Slider.vue";
import lastNews from "@/components/home/lastNews.vue";
import lastWeekNews from "@/components/home/lastWeekNews.vue";
import { mapState } from "vuex";

export default {
  name: "HomeView",
  components: {
    Header,
    Footer,
    Aside,
    Slider,
    lastNews,
    lastWeekNews,
  },
  computed: {
    ...mapState(["homeData"])
  },
  created() {
    this.$store.dispatch("getHomeData");
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || "الرئيسية";
      },
    },
  },
};
</script>

