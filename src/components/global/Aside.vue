<template>
  <!--aside column-->

  <div class="col-lg-3" v-if="settingData">
    <aside class="aside-column">
      <div class="social-icons">
        <div class="main-title">
          <h2><span>مواقع التواصل</span></h2>
        </div>
        <div class="social-icons-content" v-if="settingData.socialMedia">
          <div
            v-for="media in settingData.socialMedia"
            :key="media.id"
            :class="`box box${media.id}`"
          >
            <a :href="media.url" target="_blank">
              <i :class="media.icon"></i>
              <span class="count">{{ media.follower }}</span
              ><span class="subtitle">متابعين</span>
            </a>
          </div>
        </div>
      </div>
      <div class="relative-news" v-if="settingData.mostPopular">
        <div class="main-title">
          <h2><span>أشهر الأحداث</span></h2>
        </div>
        <div class="relative-news-content">
          <div
            class="card"
            v-for="Popular in settingData.mostPopular"
            :key="Popular.id"
          >
            <div class="row g-0">
              <div class="col-md-4">
                <router-link class="image" :to="`/single-news/${Popular.id}`">
                  <img
                    class="img-fluid"
                    :src="Popular.image"
                    :alt="Popular.title"
                  />
                </router-link>
              </div>
              <div class="col-md-8">
                <div class="card-content">
                  <div class="card-body">
                    <h3 class="card-title">
                      <router-link :to="`/single-news/${Popular.id}`">
                        {{ Popular.title }}
                      </router-link>
                    </h3>
                    <p class="card-date">
                      <router-link :to="`/single-news/${Popular.id}`">
                        <i class="bi bi-calendar"></i
                        ><small class="text-muted">
                          {{ Popular.publis_date }}</small
                        ></router-link
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="adv" v-if="settingData.announcement_two">
        <a href="#">
          <img
            class="img-fluid"
            :src="settingData.announcement_two.image"
            alt=""
        /></a>
      </div>
    </aside>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["settingData"]),
  },
  created() {
    this.$store.dispatch("getSettingData");
  },
};
</script>
<style>
</style>