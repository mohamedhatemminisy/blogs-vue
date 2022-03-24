import {
  createStore
} from 'vuex'
import axios from 'axios';
axios.defaults.baseURL = 'https://demoyoursite.net/minesy/news/public/api';
import router from '../router'

export default createStore({
  state: {
    loading: true,
    formSent: false,
    homeData: [],
    allNewsData: [],
    settingData: [],
    searchParams: [],
    errorSubscribe: null
  },

  mutations: {
    setHomeData: (state, homeData) => (state.homeData = homeData),
    setSettingData: (state, settingData) => (state.settingData = settingData),
    setNewsData: (state, allNewsData) => (state.allNewsData = allNewsData),
    setSearchData: (state, searchParams) => (state.searchParams = searchParams),
  },

  actions: {
    async getHomeData({
      commit
    }) {
      this.state.loading = true;
      await axios
        .get("home")
        .then((response) => {
          this.state.loading = false;
          commit("setHomeData", response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getSettingData({
      commit
    }) {
      await axios
        .get("settings")
        .then((response) => {
          commit("setSettingData", response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getAllNewsgData({
      commit
    }) {
      this.state.loading = true;
      await axios
        .get("all_news")
        .then((response) => {
          this.state.loading = false;
          commit("setNewsData", response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },


    async subscribeFormData({
      commit
    }, formDataFields) {
      await axios
        .post("subscribe",
          formDataFields
        )
        .then((result) => {
          console.log(result);
          this.state.errorSubscribe = null; //If Data Sent
        })
        .catch((error) => {
          this.state.formSent = false; //If Data not Sent
          this.state.errorSubscribe = error.response.data.data;
        });
    },

    async commentNewsFormData({
      commit
    }, formDataFields) {
      await axios
        .post("newsComment",
          formDataFields
        )
        .then((result) => {
          console.log(result);
          this.state.formSent = true; //If Data Sent
        })
        .catch((error) => {
          this.state.formSent = false; //If Data not Sent
          console.log(error);
          this.state.errorSubscribe = error.response.data.data;
        });
    },

    async contactFormData({
      commit
    }, formDataFields) {
      await axios
        .post("contact",
          formDataFields
        )
        .then((result) => {
          this.state.formSent = true; //If Data Sent
        })
        .catch((error) => {
          this.state.formSent = false; //If Data not Sent
          this.state.errorSubscribe = error.response.data.data;
        });
    },

    
    async filterFormData({
      commit
    }, formDataFields) {
      this.state.loading = true;
      await axios
        .post("filter", formDataFields)
        .then((result) => {
          this.state.loading = false;
          console.log(this.state.searchParams);
          router.push('/filter');

          commit("setSearchData", result.data.data);
        })
        .catch((error) => {

        });
    },

  },

  modules: {},
  getters: {},
})