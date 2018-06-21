// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.config.productionTip = false

import VueRouter from 'vue-router'

Vue.use(VueRouter)

import VueLocalization from 'vuejs-localization'

VueLocalization.requireAll(require.context('./lang', true, /\.js$/));
Vue.use(VueLocalization);

import store from './store'
import Lang from './Lang.vue'
import Game from './components/Game.vue'
import Result from './components/DialogResult.vue'
import Starter from './components/Starter.vue'
import Intro from './components/Intro.vue'
import Error from './components/Error.vue'

require('vue2-animate/dist/vue2-animate.css')

import LoadingImage from './components/model/LoadingImage.vue'

Vue.component('loading-image', LoadingImage);

require('vue-apparate');
VueApparate.init(Vue);

const router = new VueRouter({
    routes: [
        {
            path: '/:lang',
            component: Lang,
            children: [
                {path: '', name: 'start', component: Starter},
                {path: 'intro', name: 'intro', component: Intro},
                {path: 'game/:gameId', name: 'game', component: Game},
                {path: 'res', name: 'res', component: Result},
                {path: '*', name: 'error', component: Error}
            ]
        }
    ]
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})

// document.onselectstart = noselect;
// document.oncontextmenu = noselect;
//
// function noselect() {
//     return false;
// };
