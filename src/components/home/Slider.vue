<template>
  <div class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-box">
          <!-- <div class="slider-nav">
            <swiper :modules="[Thumbs]" :thumbs="{ swiper: thumbsSwiper }">
              <swiper-slide
                class="item"
                v-for="slider in sliders"
                :key="slider.id"
                ><div class="image">
                  <img
                    class="img-fluid"
                    :src="slider.image"
                    :alt="slider.title"
                  />
                </div>
                <div class="text">
                  <h2>{{ slider.title }}</h2>
                </div></swiper-slide
              >
            </swiper>
          </div> -->



          <div class="slider-for">
     <swiper
    :effect="'coverflow'"
    :grabCursor="true"
    :centeredSlides="true"
    :slidesPerView="'auto'"
    :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }"
    :pagination="true"
    :modules="modules"
    class="mySwiper"
  >
              <swiper-slide
                class="item"
                v-for="slider in sliders"
                :key="slider.id"
                ><router-link class="image" :to="`/single-news/${slider.id}`"
                  ><img
                    class="img-fluid"
                    :src="slider.image"
                    :alt="slider.title"
                /></router-link>
                <div class="text">
                  <router-link :to="`/single-news/${slider.id}`">
                    <h2>
                      {{ slider.title }}
                    </h2></router-link
                  >
                  <p>
                    <router-link :to="`/single-news/${slider.id}`">
                      <i class="bi bi-calendar"></i
                      ><small class="text-white">{{
                        slider.publis_date
                      }}</small></router-link
                    >
                  </p>
                </div></swiper-slide
              >
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import "./style.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

export default {
  name: "Slider",
  props: { sliders: Array },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [EffectCoverflow, Pagination],
    };
  },

};
</script>

<style>
</style>