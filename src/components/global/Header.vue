<template>
  <!--header-->
  <header v-if="settingData.settings">
    <div class="top-part">
      <div class="container">
        <div class="top-part-content">
          <div class="text">
            <p>{{ settingData.settings.working_times }}</p>
          </div>
          <div class="icons" v-if="settingData.socialMedia">
            <a
              v-for="media in settingData.socialMedia"
              :key="media.id"
              :href="media.url"
              target="_blank"
            >
              <i :class="media.icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="middle-part">
      <div class="container">
        <div class="middle-part-content">
          <div class="box">
            <router-link class="brand" :to="{ name: 'Home' }"
              ><img
                class="img-fluid"
                :src="settingData.settings.logo"
                :alt="settingData.settings.name"
            /></router-link>
          </div>
          <div class="box">
            <img
              class="img-fluid"
              :src="settingData.announcement.image"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <!--navbar desktop-->
    <nav class="navbar main-nav navbar-expand-lg">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#side_menu"
          aria-controls="side_menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div class="hamburger-menu">
            <span></span><span></span><span></span>
          </div>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item" :class="{ active: $route.name === 'Home' }">
              <router-link
                class="nav-link"
                aria-current="page"
                :to="{ name: 'Home' }"
                >الرئيسية</router-link
              >
            </li>
            <li class="nav-item" :class="{ active: $route.name === 'News' }">
              <router-link
                class="nav-link"
                aria-current="page"
                :to="{ name: 'News' }"
                >جميع الأخبار</router-link
              >
            </li>
            <li class="nav-item" :class="{ active: $route.name === 'Contact' }">
              <router-link
                class="nav-link"
                aria-current="page"
                :to="{ name: 'Contact' }"
                >تواصل معنا</router-link
              >
            </li>
          </ul>
        </div>
        <div class="search-area">
          <div class="dropdown">
            <button
              class="icon"
              id="search_dropdown"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-search"></i>
            </button>
            <div
              class="search-content dropdown-menu dropdown-menu-end"
              aria-labelledby="search_dropdown"
            >
              <form @submit="onSubmitForm">
                <div class="input-group">
                  <button
                    class="btn btn-outline-secondary"
                    id="go_btn"
                    type="submit"
                  >
                    بحث
                  </button>
                  <input
                    class="form-control"
                    type="text"
                    v-model="formDataFields.search"
                    placeholder="بحث..."
                    aria-label="Recipient's username"
                    aria-describedby="go_btn"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!--navbar desktop-->
    <!--side menu in mobile only-->
    <div
      class="offcanvas offcanvas-start"
      id="side_menu"
      data-bs-scroll="true"
      tabindex="-1"
      aria-labelledby="side_menu_label"
    >
      <div class="offcanvas-header">
        <button
          class="btn-close btn-close-white"
          type="button"
          data-bs-dismiss="offcanvas"
          data-bs-target="#side_menu"
          aria-controls="side_menu"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="navbar">
          <div class="collapsed navbar-collapse" id="navbarNavSide">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <router-link class="nav-link" :to="{ name: 'Home' }"
                  >الرئيسية</router-link
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="search-result.html">نتائج البحث</a>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'News' }"
                  >جميع الأخبار</router-link
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="single-news.html">صفحة الخبر</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--side menu in mobile only-->
  </header>
  <!--header-->
  <!--scroll news-->
  <section class="scroll-news">
    <div class="container">
      <div class="scroll-news-content">
        <h5 class="scroll-title">
          أخر المستجدات<i class="bi bi-chevron-left"></i>
        </h5>
        <marquee
          class="bar"
          direction="right"
          scrollamount="10"
          behavior="scroll"
          onmouseover="this.stop();"
          onmouseout="this.start();"
        >
          <router-link
            v-for="news in settingData.last_news"
            :key="news.id"
            :to="`/single-news/${news.id}`"
          >
            {{ news.title }}

            <span class="separator">
              <img src="@/assets/images/favicon.png" alt="" />
            </span>
          </router-link>
        </marquee>
      </div>
    </div>
  </section>
  <!--scroll news-->
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      formDataFields: {
        search: null,
      },
    };
  },

  methods: {
    ...mapActions(["filterFormData"]),
    onSubmitForm(e) {
      e.preventDefault();
      let formDataFieldsArr = Object.values(this.formDataFields);
      for (let index = 0; index < formDataFieldsArr.length; index++) {
        var field = formDataFieldsArr;
      }
      this.filterFormData(this.formDataFields).then((result) => {
        if (this.$store.state.searchParams) {
          e.target.reset();
          this.formDataFields.search = null;
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