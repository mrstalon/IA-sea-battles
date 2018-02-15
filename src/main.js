import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex'; 
import storage from './store';
import MainComponent from './view/MainComponent.vue';
import Menu from './view/Menu.vue';
import End from './view/End.vue';
import './styles/main.css';

Vue.use(VueRouter);
Vue.use(Vuex);

export const store = new Vuex.Store(storage);

export const router = new VueRouter({
    routes: [
        {
            path: '/game',
            component: MainComponent,
        },
        {
            path: '/',
            component: Menu,
        },
        {
            path: '/end',
            component: End,
        },
    ],
});

new Vue({
    el: '.app',
    router,
    store,
});

