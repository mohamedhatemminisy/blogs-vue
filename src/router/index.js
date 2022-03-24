import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import News from '../views/News.vue'
import singleNews from '../views/singleNews.vue'
import Filter from '../views/Filter.vue'
import Contact from '../views/Contact.vue'
import Error404 from '@/views/Error404.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/single-news/:id',
    name: 'singleNews',
    component: singleNews,
    params: true
  },
  {
    path: '/filter',
    name: 'Filter',
    component: Filter,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Error404",
    component: Error404
},
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
