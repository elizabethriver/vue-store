import Vue from 'vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import App from './App.vue'
import "@/assets/css/tailwind.css"
import router from './router'
import {valueCripto, percentCripto} from "./filters";
import { VueSpinners } from '@saeris/vue-spinners'
import VueMeta from 'vue-meta';

Vue.use(Chartkick.use(Chart))
Vue.use(VueSpinners)
Vue.use(VueMeta);
Vue.filter('valueCripto', valueCripto)
Vue.filter('percentCripto', percentCripto)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
