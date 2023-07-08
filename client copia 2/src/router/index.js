import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import ThreadView from '../views/ThreadView.vue';
import LoginView from '../views/LoginView.vue';
import RegistrationView from '../views/RegistrationView.vue';
import CommentoView from '../views/CommentoView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component:LoginView
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView
  },
  {
    path: '/Commento',
    name: 'commento',
    component: CommentoView
  },
  {
    //Questo è un route per un qualsiasi thread messaggio con dopo un id
    path: '/thread/:id',
    name: 'thread',
    component: ThreadView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
