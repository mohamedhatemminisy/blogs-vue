import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/js/bootstrap.bundle.min.js'
import 'jquery'
// import '@/assets/js/slick.min.js'
import '@/assets/sass/style.scss'
window.$ = window.jQuery = require('jquery');
import VueSocialSharing from 'vue-social-sharing'

createApp(App).use(store).use(router).use(VueSocialSharing).mount('#app')
