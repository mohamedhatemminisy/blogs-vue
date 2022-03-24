<template>
  <div class="loading" v-if="this.$store.state.loading == true">
    <div class="spinner-grow" style="width: 3rem; height: 3rem" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-if="!this.$store.state.loading == true">
  <Header />
  <singleNewsBreadcrumb />
  <!--all news-->
  <div class="single-news-page">
    <div class="container">
      <div class="single-news-content">
        <div class="row">
          <singleNews :single_news="single_news" />
          <Aside />
        </div>
      </div>
    </div>
  </div>
  <!--search news-->
  <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/global/Header.vue";
import Footer from "@/components/global/Footer.vue";
import singleNewsBreadcrumb from "@/components/global/singleNewsBreadcrumb.vue";
import singleNews from "@/components/singleNews.vue";
import Aside from "@/components/global/Aside.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    Header,
    singleNewsBreadcrumb,
    Aside,
    singleNews,
    Footer,
  },
  data() {
    return {
      single_news: null,

    };
  },
  methods: {
    async initData() {
      this.$store.state.loading = true;
      await axios
        .get(`single_news?id=${this.$route.params.id}`)
        .then((result) => {
         this.single_news = result.data.data;
          this.$store.state.loading = false;
        });
    },
  },
  async created() {
    this.initData();
    this.$watch(
      () => this.$route.params,
      async () => {
        this.initData();
      }
    );
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || "تفاصيل الخبر";
      },
    },
  },
};
</script>

