<template>
  <!--trending news-->
  <!-- <div class="trending" v-if="lastNews">
    <div class="container">
      <div class="main-title">
        <h2><span>أحدث الأخبار</span></h2>
        <div class="nav-owl"></div>
      </div>
      <div class="trending-content trending_carousel owl-carousel owl-theme">
        <div class="card" v-for="last in lastNews" :key="last.id">
          <router-link class="image" :to="`/single-news/${last.id}`">
            <img class="img-fluid" :src="last.image" :alt="last.title" />
          </router-link>
          <div class="card-body">
            <h2 class="card-title">
              <router-link :to="`/single-news/${last.id}`">
                {{ last.title }}</router-link
              >
            </h2>
            <p
              class="card-text"
              v-html="last.description.substring(0, 80)"
            ></p>
            <span class="card-date">
              <router-link :to="`/single-news/${last.id}`">
                <i class="bi bi-calendar"></i
                ><small class="text-muted">{{
                  last.publis_date
                }}</small></router-link
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="adv mb-4">
    <div class="container" v-if="announcement">
      <img class="img-fluid" :src="announcement.image" alt="" />
    </div>
  </div> -->
  <!--adv-->
  <div class="trending" v-if="lastNews">
    <div class="container">
      <div class="main-title">
        <h2><span>أحدث الأخبار</span></h2>
        <div class="nav-owl"></div>
      </div>
      <div class="trending-content trending_carousel owl-carousel owl-theme">
        <swiper
          :modules="modules"
          :slides-per-view="3"
          :space-between="20"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :navigation="navigation"
          :breakpoints="breakpoints"
        >
          <swiper-slide v-for="last in lastNews" :key="last.id">
            <div class="card">
              <router-link class="image" :to="`/single-news/${last.id}`">
                <img
                  style="height: 300px"
                  class="img-fluid"
                  :src="last.image"
                  :alt="last.title"
                />
              </router-link>
              <div class="card-body">
                <h3 class="card-title">
                  <router-link :to="`/single-news/${last.id}`">
                    {{ last.title }}</router-link
                  >
                </h3>
                <p
                  class="card-text"
                  v-html="last.description.substring(0, 80)"
                ></p>
                <span class="card-date">
                  <router-link :to="`/single-news/${last.id}`">
                    <i class="bi bi-calendar"></i
                    ><small class="text-muted">{{
                      last.publis_date
                    }}</small></router-link
                  >
                </span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
  <div class="adv mb-4">
    <div class="container" v-if="announcement">
      <img
        class="img-fluid"
        style="width: 100%"
        :src="announcement.image"
        alt=""
      />
    </div>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Navigation, A11y } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
export default {
  name: "lastNews",
  props: { lastNews: Array, announcement: Array },
  data() {
    return {
      navigation: {
        nextEl: ".nav-owl",
        // prevEl: ".nav-owl",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
      // console.log(swiper);
    };
    const onSlideChange = () => {
      // console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, A11y],
    };
  },
};
</script>

<style>
</style>