import Vue from 'vue';
import VueRouter from 'vue-router';

import Calc from '../components/Calc.vue';
import Type from '../components/Type.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Calc },
  { path: '/type', component: Type }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
