<template>
  <div class="loading" v-if="this.$store.state.loading == true">
    <div class="spinner-grow" style="width: 3rem; height: 3rem" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-if="!this.$store.state.loading == true">
    <Header />
    <Breadcrumb />
    <div class="search-news-page">
      <div class="container">
        <div class="search-news-content">
          <div class="row">
            <div class="col-lg-9">
              <div class="search-box">
                <h3 class="search-title">نتائج البحث</h3>
              </div>
              <div class="search-result" v-if="searchParams.length > 0">
                <!--if no results-->
                <div class="card" v-for="data in searchParams" :key="data.id">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <router-link
                        class="image"
                        :to="`/single-news/${data.id}`"
                      >
                        <img
                          class="img-fluid"
                          :src="data.image"
                          :alt="data.title"
                        />
                      </router-link>
                    </div>
                    <div class="col-md-8">
                      <div class="card-content">
                        <div class="card-body">
                          <h2 class="card-title">
                            <router-link :to="`/single-news/${data.id}`">
                              {{ data.title }}
                            </router-link>
                          </h2>
                          <p class="card-date">
                            <router-link :to="`/single-news/${data.id}`">
                              <i class="bi bi-calendar"></i
                              ><small class="text-muted">
                                {{ data.publis_date }}</small
                              ></router-link
                            >
                          </p>
                          <p
                            class="card-text"
                            v-html="data.description.substring(0, 200)"
                          ></p>
                        </div>
                        <div class="card-last">
                          <div class="comments">
                            <a href="#">
                              <i class="icon bi bi-chat-left-text"></i
                              ><span
                                >{{ data.comment_count }} التعليقات</span
                              ></a
                            >
                          </div>
                          <div class="views">
                            <i class="icon bi bi-eye"></i
                            ><span>{{ data.views_count }} مشاهدة</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <h3>لا توجد نتائج بحث</h3>
              </div>
            </div>
            <!--aside column-->

            <Aside />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/global/Header.vue";
import Footer from "@/components/global/Footer.vue";
import Aside from "@/components/global/Aside.vue";
import Breadcrumb from "@/components/global/Breadcrumb.vue";
import { mapState } from "vuex";

export default {
  components: {
    Header,
    Footer,
    Aside,
    Breadcrumb,
  },

  computed: {
    ...mapState(["searchParams"])
  },
  created() {
    this.$store.dispatch("filterFormData");
  },
};
</script>

<style>
</style>