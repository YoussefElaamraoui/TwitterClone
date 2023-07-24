import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
    accessToken: '',
  },
  mutations: {
    setAuthentication(state, payload) {
      state.isAuthenticated = true;
      state.accessToken = payload.accessToken;
    },
    clearAuthentication(state) {
      state.isAuthenticated = false;
      state.accessToken = '';
    },
  },
  actions: {
    setAuthentication({ commit }, accessToken) {
      commit('setAuthentication', { accessToken });
    },
    clearAuthentication({ commit }) {
      commit('clearAuthentication');
    },
  },
});
