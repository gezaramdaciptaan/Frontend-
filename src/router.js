import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home },
    { path: '/', component: Register }
  ]
});