import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '../store';



const storedAccessToken = localStorage.getItem('access_token');
if (storedAccessToken) {
  store.dispatch('setAuthentication', storedAccessToken);
}

createApp(App).use(router).use(store).mount('#app');

