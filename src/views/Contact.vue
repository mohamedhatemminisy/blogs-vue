<template>
  <Header />

  <!--breadcrumb-->
  <nav class="main-breadcrumb" aria-label="breadcrumb">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link class="brand" :to="{ name: 'Home' }"
              >الرئيسية</router-link
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">تواصل معنا</li>
        </ol>
      </nav>
    </div>
  </nav>
  <!--breadcrumb-->
  <!--single news-->
  <div class="single-news-page">
    <div class="container">
      <div class="single-news-content">
        <div class="single-news-box">
          <hr />

          <div class="row">
            <div class="col-lg-9">
              <div class="comment-form">
                <div class="main-title">
                  <h2><span>ابق علي تواصل </span></h2>
                </div>
                <form @submit="onSubmitForm">
                  <div class="row">
                    <div class="col-md-12 form-group">
                      <input
                        class="form-control"
                        type="text"
                        v-model="formDataFields.name"
                        placeholder="الاسم"
                        v-on:keyup="namemonitor"
                      />
                      <div id="name_error" style="color: red"></div>
                    </div>
                    <div class="col-md-12 form-group">
                      <input
                        class="form-control"
                        type="email"
                        placeholder="البريد الإلكتروني"
                        v-model="formDataFields.email"
                        v-on:keyup="emailMonitor"
                      />
                      <div id="email_error" style="color: red"></div>
                    </div>
                    <div class="col-md-12 form-group">
                      <input
                        class="form-control"
                        type="number"
                        placeholder="الهاتف"
                        name=""
                        v-model="formDataFields.phone"
                        v-on:keyup="phoneMonitor"
                      />
                      <div id="phone_error" style="color: red"></div>
                    </div>
                    <div class="col-md-12 form-group">
                      <textarea
                        class="form-control"
                        placeholder="التعليق"
                        name="message"
                        rows="7"
                        v-model="formDataFields.message"
                        v-on:keyup="commentMonitor"
                      ></textarea>
                      <div id="comment_error" style="color: red"></div>
                    </div>
                  </div>
                  <button class="btn-form primary" type="submit" name="button">
                    أرسل
                  </button>

                  <div class="col-lg-12" v-if="sent">
                    <div class="text-center">
                      <p class="successfully">تم ارسال الرسالة بنجاح</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <!--aside column-->
            <div class="col-lg-3">
              <aside class="aside-column">
                <div class="main-title">
                  <h2><span>بيانات التواصل </span></h2>
                </div>
                <div class="contact-info" v-if="settingData.settings">
                  <div class="content">
                    <div class="details">
                      <div class="info-box">
                        <div class="icon"><i class="bi bi-pin-map"></i></div>
                        <div class="info">
                          <h4>العنوان</h4>
                          <p>{{ settingData.settings.address }}</p>
                        </div>
                      </div>
                      <div class="info-box">
                        <div class="icon"><i class="bi bi-envelope"> </i></div>
                        <div class="info">
                          <h4>الإيميل</h4>
                          <p>
                            <a href="mailto:{{settingData.settings.email}}">{{
                              settingData.settings.email
                            }}</a>
                          </p>
                        </div>
                      </div>
                      <div class="info-box">
                        <div class="icon"><i class="bi bi-telephone"></i></div>
                        <div class="info">
                          <h4>الهاتف</h4>
                          <p>
                            <a
                              href="tel:{{settingData.settings.phone}}"
                              dir="ltr"
                              >{{ settingData.settings.phone }}</a
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--single news page-->

  <Footer />
</template>

<script>
import { mapActions, mapState } from "vuex";
import Header from "@/components/global/Header.vue";
import Footer from "@/components/global/Footer.vue";
export default {
  computed: {
    ...mapState(["settingData"]),
  },
  created() {
    this.$store.dispatch("getSettingData");
  },
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      url: window.location.href,
      sent: false,
      formDataFields: {
        email: null,
        name: null,
        comment: null,
        phone: null,
      },
    };
  },

  methods: {
    namemonitor: function (event) {
      $("#name_error").html("");
    },
    emailMonitor: function (event) {
      $("#email_error").html("");
    },
    phoneMonitor: function (event) {
      $("#phone_error").html("");
    },
    commentMonitor: function (event) {
      $("#comment_error").html("");
    },
    ...mapActions(["contactFormData"]),
    onSubmitForm(e) {
      e.preventDefault();
      let formDataFieldsArr = Object.values(this.formDataFields);
      for (let index = 0; index < formDataFieldsArr.length; index++) {
        var field = formDataFieldsArr;
      }
      this.contactFormData(this.formDataFields).then((result) => {
        $("#email_error").html("");
        $("#name_error").html("");
        $("#phone_error").html("");
        $("#comment_error").html("");
        if (this.$store.state.formSent == true) {
          e.target.reset();
          this.sent = true;
          this.formDataFields.email = null;
          this.formDataFields.name = null;
          this.formDataFields.message = null;
          this.formDataFields.phone = null;
        } else {
          this.sent = false;
          if (this.$store.state.errorSubscribe.email) {
            $("#email_error").html(this.$store.state.errorSubscribe.email[0]);
          }
          if (this.$store.state.errorSubscribe.name) {
            $("#name_error").html(this.$store.state.errorSubscribe.name[0]);
          }
          if (this.$store.state.errorSubscribe.message) {
            $("#comment_error").html(
              this.$store.state.errorSubscribe.message[0]
            );
          }
          if (this.$store.state.errorSubscribe.phone) {
            $("#phone_error").html(this.$store.state.errorSubscribe.phone[0]);
          }
        }
      });
    },
    onVerify: function (response) {
      // console.log("Verify: " + response);
      this.verifiedRecapcha = true;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || "تواصل معنا";
      },
    },
  },
};
</script>

<style>
</style>