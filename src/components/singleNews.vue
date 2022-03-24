<template>
  <div class="col-lg-9" v-if="single_news">
    <div class="image">
      <img
        class="img-fluid"
        :src="single_news.image"
        :alt="single_news.title"
      />
    </div>
    <div class="single-news-box">
      <div class="text">
        <h2 class="subtitle">{{ single_news.publis_date }}</h2>
      </div>
      <div class="meta">
        <div class="single">
          <i class="bi bi-calendar-event"></i
          ><span>{{ single_news.publis_date }} </span>
        </div>
        <div class="single">
          <i class="bi bi-eye"></i
          ><span>{{ single_news.views_count }} مشاهدة</span>
        </div>
      </div>
      <hr />

      <p class="details" v-html="single_news.description"></p>

      <div class="share-social">
        <h3 class="share-title">مشاركة المقال</h3>
        <div class="share-social-content">
          <!-- <div class="box box1">
            <a href="#" target="_blank"> <i class="bi bi-facebook"></i></a>
          </div> -->

          <div class="box box1">
            <ShareNetwork
              network="facebook"
              :url="url"
              :title="single_news.title"
              :description="single_news.description"
              quote="The hot reload is so fast it\'s near instant. - Evan You"
              hashtags="vuejs,vite"
            >
              <i class="bi bi-facebook"> </i>
            </ShareNetwork>
          </div>

          <div class="box box2">
            <ShareNetwork
              network="twitter"
              :url="url"
              :title="single_news.title"
              hashtags="vuejs,vite"
            >
              <i class="bi bi-twitter"> </i>
            </ShareNetwork>
          </div>
          <div class="box box3">
            <ShareNetwork
              network="WhatsApp"
              :url="url"
              :title="single_news.title"
              :description="single_news.description"
            >
              <i class="bi bi-whatsapp"></i>
            </ShareNetwork>
          </div>
        </div>
      </div>
      <div class="comments-list">
        <div class="main-title">
          <h2><span class="w-100">التعليقات</span></h2>
        </div>
        <ul v-if="single_news.comments">
          <li
            class="comment-item"
            v-for="comment in single_news.comments"
            :key="comment.id"
          >
            <div class="comment-body">
              <h5>{{ comment.name }}</h5>
              <span>{{ comment.creation_date }}</span>
              <p>{{ comment.comment }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="comment-form">
        <div class="main-title">
          <h2><span>اترك تعليقا</span></h2>
        </div>
        <form @submit="onSubmitForm">
          <div class="row">
            <div class="col-md-6 form-group">
              <input
                class="form-control"
                type="text"
                v-model="formDataFields.name"
                placeholder="الاسم"
                v-on:keyup="namemonitor"
              />
              <div id="name_error" style="color: red"></div>
            </div>

            <div class="col-md-6 form-group">
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
              <textarea
                class="form-control"
                v-model="formDataFields.comment"
                placeholder="التعليق"
                rows="7"
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
              <p class="successfully">تم التعليق بنجاح بانتظار التفعيل من قبل الادارة</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: { single_news: Array },
  data() {
    return {
      url: window.location.href,
      sent: false,
      formDataFields: {
        email: null,
        name: null,
        comment: null,
        news_id: this.single_news.id,
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
    commentMonitor: function (event) {
      $("#comment_error").html("");
    },
    ...mapActions(["commentNewsFormData"]),
    onSubmitForm(e) {
      e.preventDefault();
      let formDataFieldsArr = Object.values(this.formDataFields);
      for (let index = 0; index < formDataFieldsArr.length; index++) {
        var field = formDataFieldsArr;
      }
      console.log(this.formDataFields);
      this.commentNewsFormData(this.formDataFields).then((result) => {
        $("#email_error").html("");
        $("#name_error").html("");
        $("#comment_error").html("");
        if (this.$store.state.formSent == true) {
          e.target.reset();
          this.sent = true;
          this.formDataFields.email = null;
          this.formDataFields.name = null;
          this.formDataFields.comment = null;
        } else {
          this.sent = false;
          if (this.$store.state.errorSubscribe.email) {
            $("#email_error").html(this.$store.state.errorSubscribe.email[0]);
          }
          if (this.$store.state.errorSubscribe.name) {
            $("#name_error").html(this.$store.state.errorSubscribe.name[0]);
          }
          if (this.$store.state.errorSubscribe.comment) {
            $("#comment_error").html(
              this.$store.state.errorSubscribe.comment[0]
            );
          }
        }
      });
    },
    onVerify: function (response) {
      // console.log("Verify: " + response);
      this.verifiedRecapcha = true;
    },
  },
};
</script>

<style>
</style>