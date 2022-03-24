<template>
  <!--to top-->
  <div id="toTop">
    <button><i class="bi bi-chevron-double-up"></i></button>
  </div>
  <!--to top-->
  <!--footer part-->
  <footer v-if="settingData.settings">
    <div class="container">
      <div class="footer-content">
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <div class="footer-box">
              <div class="about">
                <a href="#">
                  <img
                    class="img-fluid mb-4"
                    src="@/assets/images/logo-footer.png"
                    :alt="settingData.settings.name"
                /></a>
                <div class="footer-img">
                  <img
                    class="img-fluid mb-4"
                    :src="settingData.settings.logo_white"
                    :alt="settingData.settings.name"
                  />
                </div>
                <h3>من نحن</h3>
                <p v-html="settingData.settings.description"></p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="footer-box">
              <h3>المقالات الأخيرة</h3>
              <div class="recent" v-if="settingData.last_news">
                <div
                  class="card"
                  v-for="news in settingData.last_news"
                  :key="news.id"
                >
                  <div class="row g-0">
                    <div class="col-3">
                      <router-link
                        class="image"
                        :to="`/single-news/${news.id}`"
                      >
                        <img
                          class="img-fluid"
                          :src="news.image"
                          :alt="news.title"
                        />
                      </router-link>
                    </div>
                    <div class="col-9">
                      <div class="card-content">
                        <div class="card-body">
                          <h5 class="card-title">
                            <router-link :to="`/single-news/${news.id}`">
                              {{ news.title }}
                            </router-link>
                          </h5>
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
            </div>
          </div>
          <div class="col-lg-4 col-md-12">
            <div class="footer-box">
              <h3>معلومات التواصل</h3>
              <p>اشترك معنا الآن لنصلك آخر الأخبار</p>
              <div class="contact">
                <form @submit="onSubmitForm">
                  <div class="input-group">
                    <input
                      class="form-control"
                      type="text"
                      v-model="formDataFields.email"
                      placeholder="أدخل إيميلك"
                      aria-label="Recipient's username"
                      aria-describedby="go_btn"
                    />

                    <button
                      class="btn btn-outline-secondary"
                      id="go_btn"
                      type="submit"
                    >
                      اشتراك
                    </button>
                  </div>
                  <div class="col-lg-12" v-if="sent">
                    <div class="text-center">
                      <p class="successfully">تم الاشتراك بنجاح</p>
                    </div>
                  </div>
                  <div
                    class="invalid-feedback d-block"
                    v-if="errorEmail && !sent"
                    v-for="(error, index) in errorEmail"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                  <!-- <div id="email_error" style="color: red"></div> -->
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright" v-if="settingData.settings.copyrights">
      <div class="copy-text">
        <p>{{ settingData.settings.copyrights }}</p>
      </div>
    </div>
  </footer>
  <!--footer part-->
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      sent: null,
      formDataFields: {
        email: null,
      },
      errorEmail: null,
    };
  },

  methods: {
    ...mapActions(["subscribeFormData"]),
    onSubmitForm(e) {
      this.sent = null;
      e.preventDefault();

      this.subscribeFormData(this.formDataFields).then((result) => {
        if (!this.$store.state.errorSubscribe) {
          e.target.reset();
          this.sent = true;
          this.errorEmail = null;
          this.formDataFields.email = null;
          setTimeout(() => {
            this.sent = null;
          }, 3000);
        } else {
          this.sent = null;
          let errors = this.$store.state.errorSubscribe;
          this.errorEmail = errors.email;
          setTimeout(() => {
            this.errorEmail = null;
          }, 3000);
        }
      });
    },
    onVerify: function (response) {
      // console.log("Verify: " + response);
      this.verifiedRecapcha = true;
    },
  },

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