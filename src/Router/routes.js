import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Create from '../components/Create.vue';
import Edit from '../components/Edit.vue';
import View from '../components/View.vue';
import Index from '../components/Index.vue';
import Register from '../components/Auth/Register.vue';
import Login from '../components/Auth/Login.vue';
import Logout from '../components/Auth/Logout.vue';

const routes = [
    {
      name: 'Create',
      path: '/create',
      component: Create,
      meta: { requiresAuth: true }
    },
    {
      name: 'Edit',
      path: '/edit/:id',
      component: Edit,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      name: 'View',
      path: '/view/:id',
      component: View,
      props: true
    },
    {
      name: 'Index',
      path: '/index',
      component: Index
    },
    {
      name: 'Register',
      path: '/register',
      component: Register
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Logout',
      path: '/logout',
      component: Logout
    },
];

const router = new VueRouter({
    routes, 
    hashbang: false,
    mode: 'history'
})


export default router