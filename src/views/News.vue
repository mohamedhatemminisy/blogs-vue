<template>
  <div class="loading" v-if="this.$store.state.loading == true">
    <div class="spinner-grow" style="width: 3rem; height: 3rem" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-if="!this.$store.state.loading == true">
  <Header />
  <Breadcrumb />
  <!--all news-->
  <div class="allnews-page">
    <div class="container">
      <div class="allnews-content">
        <div class="row">
          <div class="col-lg-9">
            <!--if no results-->
            <div class="allnews-">
              <div class="row" v-if="allNewsData">
                <div
                  class="col-lg-4 col-md-6"
                  v-for="news in allNewsData"
                  :key="news.id"
                >
                  <div class="card">
                    <router-link class="image" style="height:200px;" :to="`/single-news/${news.id}`">
                      <img
                        class="img-fluid"
                        :src="news.image"
                        :alt="news.title"
                      />
                    </router-link>

                    <div class="card-body">
                      <h2 class="card-title">
                        <router-link :to="`/single-news/${news.id}`">
                          {{ news.title }}
                        </router-link>
                      </h2>
                      <p class="card-text"
                        v-html="news.description.substring(0, 80)"
                      ></p>
                   <p class="card-date">
                    <router-link :to="`/single-news/${news.id}`">
                      <i class="bi bi-calendar"></i
                      ><small class="text-muted">
                        {{ news.publis_date }}</small
                      ></router-link
                    >
                  </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
import Breadcrumb from "@/components/global/Breadcrumb.vue";
import Aside from "@/components/global/Aside.vue";
import { mapState } from "vuex";

export default {
  name: "HomeView",
  components: {
    Header,
    Breadcrumb,
    Aside,
    Footer,
  },

  computed: {
    ...mapState(["allNewsData"]),
  },
  created() {
    this.$store.dispatch("getAllNewsgData");
  },

  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || "الاخبار";
      },
    },
  },
};
</script>

