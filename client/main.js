import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex'; 
import storage from './store';

import App from './App.vue';

import Menu from './view/Menu.vue';
import Game from './view/Game.vue';
import End from './view/End.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

export const store = new Vuex.Store(storage);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Menu,
        },
        {
            path: '/game',
            component: Game,
        },
        {
            path: '/end',
            component: End,
        }
    ],
});

const app = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
});

