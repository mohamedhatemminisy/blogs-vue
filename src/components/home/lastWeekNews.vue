<template>
  <!--last news-->
  <div class="col-lg-9" v-if="lastWeekNews">
    <div class="last-news">
      <div class="main-title">
        <h2><span>أحداث الاسبوع الأخير</span></h2>
      </div>
      <div class="last-news-content">
        <div class="card" v-for="lastWeek in lastWeekNews" :key="lastWeek.id">
          <div class="row g-0">
            <div class="col-md-4">
              <router-link class="image" :to="`/single-news/${lastWeek.id}`">
                <img
                  class="img-fluid"
                  :src="lastWeek.image"
                  :alt="lastWeek.title"
                />
              </router-link>
            </div>
            <div class="col-md-8">
              <div class="card-content">
                <div class="card-body">
                  <h2 class="card-title">
                    <router-link :to="`/single-news/${lastWeek.id}`">
                        {{ lastWeek.title }}
                      </router-link
                    >
                  </h2>
                  <p class="card-date">
                    <router-link :to="`/single-news/${lastWeek.id}`">
                      <i class="bi bi-calendar"></i
                      ><small class="text-muted">
                        {{ lastWeek.publis_date }}</small
                      ></router-link
                    >
                  </p>

                  <p
                    class="card-text"
                    v-html="lastWeek.description.substring(0, 80)"
                  ></p>
                </div>
                <div class="card-last">
                  <div class="comments">
                    <router-link :to="`/single-news/${lastWeek.id}`">
                      <i class="icon bi bi-chat-left-text"></i
                      ><span>{{ lastWeek.comment_count }} التعليقات</span>
                    </router-link>
                  </div>
                  <div class="views">
                    <i class="icon bi bi-eye"></i
                    ><span> {{ lastWeek.views_count }} مشاهدة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--last news-->
</template>

<script>
export default {
  name: "lastWeekNews",
  props: ["lastWeekNews"],
};
</script>

<style>
</style>