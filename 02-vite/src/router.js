import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import CountryView from './views/CountryView.vue';
import PostsView from './views/PostsView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/articles', component: PostsView },
    { path: '/pays', component: CountryView }
  ],
});

export default router;
