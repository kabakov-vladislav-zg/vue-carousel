import Vue from 'vue';
import { CarouselDemo, CarouselItem } from '../src/index';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/settings.css';
import './assets/index.scss';

Vue.component('CarouselDemo', CarouselDemo);
Vue.component('CarouselItem', CarouselItem);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
