import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import PostsView from './views/PostsView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/articles', component: PostsView }
  ],
});

export default router;
