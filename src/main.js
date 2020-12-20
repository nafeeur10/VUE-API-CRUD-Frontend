import Vue from 'vue'
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import NProgress from 'nprogress';

import App from './App.vue';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/nprogress/nprogress.css';
import VeeValidate from 'vee-validate';
import router from './Router/routes.js'
import store from './Store/user.js'

import Vuex from 'vuex'

import User from './Helpers/User'
window.User = User

window.EventBus = new Vue();

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
Vue.use(Vuex)

Vue.config.productionTip = false;
const JwtToken = `Bearer ${localStorage.getItem('token')}`
axios.defaults.headers.common['Authorization'] = JwtToken;


router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

router.afterEach(() => {
  NProgress.done()
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')