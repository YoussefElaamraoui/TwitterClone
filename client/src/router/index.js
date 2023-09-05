import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ThreadView from '../views/ThreadView.vue';
import LoginView from '../views/LoginView.vue';
import RegistrationView from '../views/RegistrationView.vue';

const isAuthenticated = () => {
  return new Promise((resolve, reject) => {
    const accessToken = localStorage.getItem('access_token');
    const isAuthenticated = accessToken && accessToken !== '';
    console.log('isAuthenticated:', isAuthenticated);
    resolve(isAuthenticated);
  });
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView,
  },
  {
    path: '/thread/:id',
    name: 'thread',
    component: ThreadView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Global navigation guard
router.beforeEach(async (to, from, next) => {
  const authenticated = await isAuthenticated();

  if (to.name === 'registration') {
    next();
  }

  if (to.name !== 'login'  && !authenticated) {
    next({ name: 'login' }); // Redirect to login if not authenticated
  } else if (to.name === 'login' && authenticated) {
    next({ name: 'home' }); // Redirect to home if already authenticated and trying to access login
  } else {
    next(); // Proceed to the route
  }
});

export default router;
