<template>
  <div>
    <router-view />
    <router-link :to="page === 'numberpad' ? '/type' : '/'">
      <v-btn
        class="fab"
        absolute
        elevation="2"
        fab
        bottom
        right
        @click="onClick"
        >...</v-btn
      ></router-link
    >
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import 'toastify-js/src/toastify.css';

export default {
  name: 'App',
  computed: {
    ...mapState(['page'])
  },
  methods: {
    onClick() {
      this.setPage({
        page: this.page === 'numberpad' ? 'typing' : 'numberpad'
      });
    },
    ...mapMutations(['setPage'])
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:300,500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

body {
  background-color: #3fa9fc;
}

.fab {
  margin-bottom: 45px;
}
</style>
