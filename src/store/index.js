import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: 'numberpad'
  },
  mutations: {
    setPage: (state, payload) => {
      state.page = payload.page;
    }
  }
});
